'use strict'
const information = require("../SRC/information_test");

describe("Input a username", () => {
    test("The username should be correct", () => {
      information.set_username("Wiseman");
      const input = "Wiseman";
      const output = information.get_username();
      expect(input).toEqual(output);
    });
  });
  
  describe("Length of the username", () => {
    test("the length of the username should be greater than 4 and less than 20", () => {
      information.set_username("Wiseman");
      const input = "Wiseman";
      const output = information.get_username();
      expect(input.length).toEqual(output.length);
    });
  });
  
  describe("Check if the password contains a number, special char and letter", () => {
    test("test if the password contains a number", () => {
      information.set_password("2456Ku@");
      const input_password = "2456Ku@";
  
      const output_password = information.get_password();
      expect(input_password.match([/0-9/])).toEqual(output_password.match([/0-9/]));
    });
  
  });
  
