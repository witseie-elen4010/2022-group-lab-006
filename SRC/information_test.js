'use strict'
let username = "Goodness";
let password1 = "12345Ku@";
let email = "software@engineering.com"


module.exports =
{ set_username: function(name)
    {
        username = name;
    },
    get_username: function()
    {
        return username;
    },

    

}