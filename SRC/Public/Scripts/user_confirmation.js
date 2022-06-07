const form = document.querySelector("form");
const username = document.getElementById("username");
const password1 = document.getElementById("password1");
var uppercase = document.getElementById("upper");
var lowercase = document.getElementById("lower");
var number = document.getElementById("number");
var len = document.getElementById("length_");
var special_char = document.getElementById("special_char");
const password2 = document.getElementById("password2");
const email = document.getElementById("email");

//preventing the form to submit before entering valid information
document.querySelector("button").addEventListener("click", (event) => {
    event.preventDefault();
    validate_input();
   
})

function on_success(input) { //hidding the error message if the user inputs meet the requirements
    let parent = input.parentElement;
    let message_element = parent.querySelector("small");
    message_element.style.visibility = "hidden";
    message_element.innerText = "";
}
function on_error(input, message) { //tell the user that the requirements are not met
    let parent = input.parentElement;
    let message_element = parent.querySelector("small");
    message_element.style.visibility = "visible";
    message_element.innerText = message;
}

function username_validation() //validation username
{
      //check if username is  empty
    if (username.value.trim() === "") {
        on_error(username, "Enter username");

    }
    else {
        on_success(username);

    }
    if(username.value.length<4 || username.value.length >=20) //password must have atleast 7 characters
    {
        uname_len.style.color = 'red';
    }
    else{

        uname_len.style.color = 'green';

    }


}



function email_validation(email) //validating the email format
{
   return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function password_validation()
 {
       //validating password requirements

    if(password1.value.match(/[0-9]/)) //password can contain from 0 to 9
    {
        number.style.color = 'green';
    }
    else{
        number.style.color = 'red';
    }
    //password must contain special case
    if(password1.value.match(/[!\@\#\$\%\^\&\*\(\)\-\_\+\=\~\?\.\,\?\<\>\{\}\\]/)) 
    {
        special_char.style.color = 'green';
    }
    else{
        special_char.style.color = 'red';
    }

    //checking upper cases in the password
    if(password1.value.match(/[A-Z]/))//
    {
        uppercase.style.color = 'green';
    }
    else{
        uppercase.style.color = 'red';
    }

    //checking lower cases in the password
    if(password1.value.match(/[a-z]/))//
    {
        lowercase.style.color = 'green';
    }
    else{
        lowercase.style.color = 'red';
    }

    //checking password length
    
    if(password1.value.length<7) //password must have atleast 7 characters
    {
        len.style.color = 'red';
    }
    else{
        len.style.color = 'green';
    }


    //validating password2
    if(password2.value.trim()==="")
    {
        on_error(password2,"Please enter password")
    }
    else
    {
        if(password1.value.trim()!==password2.value.trim())
        {
            on_error(password2, "Passwords do not match")

        }
        else
        {
            on_success(password2)
        }
    }



 }
function validate_input() //input validation
{

    username_validation();
    password_validation();


       //validating the format of the email and that email is not empty
      if (email.value.trim() === "") {
        on_error(email, "Enter email");

    }
    else {
        if(!email_validation(email.value.trim()))
        {
            on_error(email,"Email is not valid")
        }
        else
        {
            on_success(email);
        }
        
    }
   
  
}