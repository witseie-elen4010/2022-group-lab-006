'use strict'
let username = "Goodness";
let password1 = "12345Ku@";
let password2 = "12345Ku@";
let email = "software@engineering.com"


module.exports =
{
    set_username: function (name) {
        username = name;
    },
    get_username: function () {
        return username;
    },

    set_password: function (password_r) {
        password1 = password_r;
    }
    ,
    password_requirement: function (password_r) {
        password1.value.match(/[0-9]/)
        password1.value.match([/!\@\#\$\%\^\&\*\(\)\-\_\+\=\~\?\.\,\?\<\>\{\}\\/])
        password1.value.match(/A-Z/)
    },
    get_password: function () {
        return password1
    },


}