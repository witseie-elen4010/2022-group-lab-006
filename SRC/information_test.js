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

    get_password: function () {
        return password1
    },


    set_email: function(email_r)
    {
        email= email_r

    },
    get_email: function() 
    {
        return email;
    }


}