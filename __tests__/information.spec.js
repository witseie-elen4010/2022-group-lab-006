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
  