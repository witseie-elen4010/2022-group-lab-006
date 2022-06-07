'use strict'

let keypressed = 'K'



module.exports = 
{
set_keypressed : function(key) 
{ 
    keypressed = key;
  
}

,

 get_keypressed: function()
 {
     return keypressed;
 }
 
}