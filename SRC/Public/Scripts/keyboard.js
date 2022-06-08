"use strict"

import { inputLetter } from "./singlePlayer.js";



const keyboard = document.querySelector('.keyboard');

const keyLayout = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "delete",
          "A", "S", "D", "F", "G", "H", "J", "K", "L", "enter",
               "Z", "X", "C", "V", "B", "N", "M"
  ]
  
  const keyboardInput = (key) => {
    console.log('key pressed =', key)
    inputLetter(key)
    
  }


export function KeyColour(key, colour){
  console.log("got into the function")
  if(colour == "GREEN"){
    const keyValue = document.getElementById(key)
    keyValue.classList.add("key_correct_position")
    console.log("leaving function")

  }else{
    const keyValue = document.getElementById(key)
    keyValue.classList.add("key_incorrect_position")
    console.log("leaving function")
  }
  
}

  
  keyLayout.forEach(key => {
    const keyElement = document.createElement("button");
    keyElement.textContent = key
    const insertLineBreak = ["delete", "enter", "M"].indexOf(key) !== -1;
    keyElement.setAttribute("id", key);
    keyElement.addEventListener("click", () => keyboardInput(key))
    keyElement.classList.add("keyboard__key");
    keyboard.append(keyElement);
    switch (key) {
      case "delete":
        keyElement.classList.add("keyboard__keys_long");
      case "enter":
        keyElement.classList.add("keyboard__keys_long");
    }
    if (insertLineBreak) {
      keyboard.appendChild(document.createElement("br"));
    }
  
  });