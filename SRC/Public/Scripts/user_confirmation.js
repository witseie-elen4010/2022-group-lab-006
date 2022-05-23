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


}
function validate_input() //input validation
{

    username_validation();
   
  
}