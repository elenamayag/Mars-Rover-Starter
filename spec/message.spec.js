const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
   // Test 4: Throws an error if a name is NOT passed into the constructor as the first parameter
  it('throws error if a name is NOT passed into the constructor as the first parameter', function () {
    expect(function () {
      let message; 
      
      message = new Message(); 
      // created a Message object without passing a name
    }).toThrowError("Name required");
  });


  // Test 5: Constructor sets name
  it('constructor sets name', function () {
    // Created a Message object with a name and commands
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]; 
    let message = new Message('Test message with two commands', commands); 
    // Used an expect statement to check if the name is set correctly
    expect(message.name).toBe('Test message with two commands');
  });


  // Test 6: Contains a commands array passed into the constructor as the 2nd argument
  it('contains a commands array passed into the constructor as the 2nd argument', function () {
    // Created a Message object with a name and commands
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands); 
    // Used an expect statement to check if the commands array is set correctly
    expect(message.commands).toEqual(commands);
  });
});
  
 