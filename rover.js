class Rover {
   constructor(position) {
      // Constructor sets the initial state of the rover
      this.position = position; // Set the rover's initial position
      this.mode = 'NORMAL'; // Set the default mode to 'NORMAL'
      this.generatorWatts = 110; // Set the default generatorWatts
    }
  
    // Method to receive and process a message
    receiveMessage(message) {
      // Create an array to store results for each command
      let results = [];
  
      // Iterate through each command in the message
      for (let i = 0; i < message.commands.length; i++) {
        let command = message.commands[i];
  
        // Handle each type of command
        if (command.commandType === 'STATUS_CHECK') {
          // STATUS_CHECK command - Checks the rover's status
          results.push({
            completed: true,
            roverStatus: {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position,
            },
          });

        } else if (command.commandType === 'MODE_CHANGE') {
          // MODE_CHANGE command - Changes the rover's mode
          this.mode = command.value;
          results.push({ completed: true });

        } else if (command.commandType === 'MOVE') {
          // MOVE command - Move the rover to a new position
          
          if (this.mode === 'LOW_POWER') {
            // Rover cannot move in LOW_POWER mode
            results.push({ completed: false });

          } else {
            // Update the rover's position and complete the command
            this.position = command.value;
            results.push({ completed: true });
          }
        }
      }
  
      // Return an object with message name and results array
      return {
        message: message.name,
        results: results,
      };
    }
  }
module.exports = Rover;  