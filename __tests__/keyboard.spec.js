'use strict';
 const keyboard = require("../SRC/keyboard_test_functions");

 describe("Press a key", () => 
 {
     test ("The key pressed is received", ()=>
     {
     keyboard.set_keypressed("P");
     const input = "P";
     const output = keyboard.get_keypressed();
     expect(input).toEqual(output);
      });
 }); 

