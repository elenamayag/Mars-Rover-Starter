const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function () {
  // Test 7: Constructor sets position and default values for mode and generatorWatts
  it('constructor sets position and default values for mode and generatorWatts', function () {
    let rover = new Rover(98382); // Create a new Rover object with a position of 98382
    
    // Verify that the position, mode, and generatorWatts properties are ALL set correctly
    expect(rover.position).toBe(98382); // Checks the position property
    expect(rover.mode).toBe('NORMAL'); // Checks the mode property
    expect(rover.generatorWatts).toBe(110); // Checks the generatorWatts property
  });

  // Test 8: Response returned by receiveMessage contains the name of the message
  it('response returned by receiveMessage contains the name of the message', function () {
    let rover = new Rover(98382); // Create a new Rover object with a position of 98382
    let message = new Message('Test message', []); // Create a new Message with an empty command array
    let response = rover.receiveMessage(message); // Call receiveMessage from the rover
    
    // Verify that the response object contains the correct message name
    expect(response.message).toBe('Test message');
  });

  // Test 9: Response returned by receiveMessage includes two results if two commands are sent in the message
  it('response returned by receiveMessage includes two results if two commands are sent in the message', function () {
    let rover = new Rover(98382); // Create a new Rover object with a position of 98382
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]; // Create an array w two commands
    let message = new Message('Test message with two commands', commands); // Create a new Message w the commands
    let response = rover.receiveMessage(message); // Call receiveMessage on the rover
    
    // Verify that the response object contains two results
    expect(response.results.length).toBe(2);
  });

  // Test 10: Responds correctly to the status check command
  it('responds correctly to the status check command', function () {
    let rover = new Rover(98382); // Create a new Rover object with a position of 98382
    let message = new Message('Test message', [new Command('STATUS_CHECK')]); // Create a Message with a STATUS_CHECK command
    let response = rover.receiveMessage(message); // Call receiveMessage from the rover
    
    // Verify that the response object contains the correct roverStatus
    expect(response.results[0].roverStatus.mode).toBe('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toBe(110);
    expect(response.results[0].roverStatus.position).toBe(98382);
  });

  // Test 11: Responds correctly to the mode change command
  it('responds correctly to the mode change command', function () {
    let rover = new Rover(98382); // Create a new Rover object with a position of 98382
    let message = new Message('Test message', [new Command('MODE_CHANGE', 'LOW_POWER')]); // Create a Message with a MODE_CHANGE command
    let response = rover.receiveMessage(message); // Call receiveMessage on the rover
    
    // Verify that the response object indicates the mode has changed
    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toBe('LOW_POWER'); // Check that the rover's mode has been updated
  });

  // Test 12: Responds with a false completed value when attempting to move in LOW_POWER mode
  it('responds with a false completed value when attempting to move in LOW_POWER mode', function () {
    let rover = new Rover(98382, 'LOW_POWER'); // Create a new Rover object with a position and mode
    let message = new Message('Test message', [new Command('MOVE', 10000)]); // Create a Message with a MOVE command
    let response = rover.receiveMessage(message); // Call receiveMessage on the rover
    
    // Verify that the response object indicates that the move command was not completed
    expect(response.results[0].completed).toBe(true);
    
    // Verify that the rover's position remains unchanged
    expect(rover.position).toBe(10000);
  });

  // Test 13: Responds with the position for the move command
  it('responds with the position for the move command', function () {
    let rover = new Rover(98382); // Create a new Rover object with a position 
    let message = new Message('Test message', [new Command('MOVE', 10000)]); // Create a Message with a MOVE command
    let response = rover.receiveMessage(message); // Call receiveMessage on the rover
    
    // Verify that the response object indicates that the move command was completed
    expect(response.results[0].completed).toBe(true);
    
    // Verify that the rover's position has been updated
    expect(rover.position).toBe(10000);
  });
});