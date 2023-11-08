const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function () {
  // Test 1: Throws an error if a command type is NOT passed into the constructor as the first parameter

  it("throws error if command type is NOT passed into constructor as the first parameter", function () {
    expect(function () { new Command(); }).toThrow(new Error('Command type required.'));
  });

  //launchcode made code above^^   me belowe vv


  // Test 2: Constructor sets command type

  it('constructor sets command type', function () {
    // Create a Command object with a command type
    let modeCommand = new Command('MODE_CHANGE', 'LOW_POWER'); 

    // Declare command with let
    // expect statement to check if the command type is set correctly
    expect(modeCommand.commandType).toBe('MODE_CHANGE');
  });


  // Test 3: Constructor sets a value passed in as the 2nd argument

  it('constructor sets a value passed in as the 2nd argument', function () {
    // Create a Command object with a value
    let moveCommand = new Command('MOVE', 12000); 

    // Declare command with let
    // expect statement to check if the value is set correctly
    expect(moveCommand.value).toBe(12000);
  });
});