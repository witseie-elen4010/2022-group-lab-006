



function logging_in()
{


jQuery(window).load(function()
{
    sessionStorage.setItem('status', 'loggedIn')

});

if(sessionStorage.getItem('status') != null)
{
    console.log('You are logged in') ;

}

else{
    console.log('you are not logged in');
}
}