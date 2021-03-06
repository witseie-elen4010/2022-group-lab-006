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


  describe("Check if the password contains a special char", () => {
    test("test if the password contains a special character", () => {
      information.set_password("2456Ku@");
      const input_password = "2456Ku@";

      const output_password = information.get_password();
      expect(input_password.match([/!\@\#\$\%\^\&\*\(\)\-\_\+\=\~\?\.\,\?\<\>\{\}\\/])).toEqual(output_password.match([/!\@\#\$\%\^\&\*\(\)\-\_\+\=\~\?\.\,\?\<\>\{\}\\/]));
    });
  });

  describe("Check if the password contains a capital letter (uppercase) ", () => {
    test("test if the password contains a capital letter", () => {
      information.set_password("2456Ku@");
      const input_password = "2456Ku@";

      const output_password = information.get_password();
      expect(input_password.match([/A-Z/])).toEqual(output_password.match([/A-Z/]));
    });
  });
  describe("Check if the password contains a small letter (lowercase)", () => {
    test("test if the password contains a small letter", () => {
      information.set_password("2456Ku@");
      const input_password = "2456Ku@";

      const output_password = information.get_password();
      expect(input_password.match([/a-z/])).toEqual(output_password.match([/a-z/]));
    });
  });

  describe("Check if the password receive is the same as input", () => {
    test("test if the password is the same as input", () => {
      information.set_password("2456Ku@");
      const input_password = "2456Ku@";

      const output_password = information.get_password();
      expect(input_password.value).toEqual(output_password.value);
    });
  });

  describe("Check if the email format is correct", () => {
    test("test email format if it has @  and .", () => {
      information.set_email("software@dev3.com");
      const input_email = "software@dev3.com";

      const output_email = information.get_email();
      expect(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input_email)).toEqual(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input_email));
    });
  });


});

