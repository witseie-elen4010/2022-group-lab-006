"use strict";

import { FiveLetterWord } from "./word_generator.js";
import { WordIsValid } from "./word_generator.js";
import { KeyColour } from "./keyboard.js";
//import { FileRead } from "./store_actions.js";


const numberOfRows = 6; //gives number of trials
const numberOfColumns = 5; // gives the length of the word guessed

let row = 0; //current guess (attempt number)
let column = 0; // current letter for attempt

let isGameOver = false;
const wordEntered = [];

const word = FiveLetterWord().toUpperCase();

const gameBoard = document.querySelector('.gameBoard');
const Message = document.querySelector('.Message');

for (let i = 0; i < numberOfRows; i++) {
  for (let j = 0; j < numberOfColumns; j++) {
    const block = document.createElement("span");
    block.id = i.toString() + "-" + j.toString();
    block.classList.add("block");
    gameBoard.append(block);
  }
}

const updateMessage = function (message) {
 const messageElement =  document.createElement('p');
 messageElement.textContent = message;
 Message.append(messageElement);
 setTimeout(() => Message.removeChild(messageElement),2000);

}

export const inputLetter = (key) => {
  if (isGameOver) return;

  //alert(e.code);
  if (column < numberOfColumns && row< numberOfRows) {
    const currentBlock = document.getElementById(row.toString() + "-" + column.toString());
    if (currentBlock.textContent == "" && key.length == 1) {
       currentBlock.textContent = key;
       column += 1;
    }
  }
  if (key == "delete" && column > 0) {
        column-= 1
        const currentBlock = document.getElementById(row.toString() + "-" + column.toString());
        currentBlock.textContent = "";
    }
  if (key == "enter" && column == 5) {
    for (let i = 0; i<numberOfColumns;i++){
      const currentBlock = document.getElementById(
        row.toString() + "-" + i.toString()
      );
     wordEntered.push(currentBlock.innerText)
     console.log(wordEntered.join(''));
     console.log(WordIsValid(wordEntered.join('').toLowerCase()));
    }
        storeCookie(wordEntered.join(''));  
        wordEntered.length =0;
    }

    if (!isGameOver && row == numberOfRows) {
      isGameOver = true;
      updateMessage("Better Luck Next Time")
    }
  
};

function update() {
  let correct = 0;
  for (let i = 0; i < numberOfColumns; i++) {
    const currentBlock = document.getElementById(
      row.toString() + "-" + i.toString()
    );

    let letter = currentBlock.innerText;

    //a letter is in correct position
    if (word[i] == letter) {
      currentBlock.classList.add("wordCorrect");
      correct += 1;
      KeyColour(letter,"GREEN");
      if(correct == 5){
        isGameOver = true
        updateMessage("Congradulations You win")
      }
      
    } // all letters are in the word in correct positions
    else if (word.includes(letter)) {
      KeyColour(letter,"YELLOW")
      currentBlock.classList.add("inTheWord");
    } //letter is in not in the word
    else {
      currentBlock.classList.add("notInWord");
    }
  }
};

// function for storing cookies with user move information.
function storeCookie(wordEntered) {
  let username = "test";
  if (wordEntered == word && WordIsValid(wordEntered.toLowerCase()) == true) {
    update();
    let current = new Date();
    console.log(current.toLocaleDateString());
    console.log(current.toLocaleTimeString());
    const action = {
      Username: username,
      DateOfAction: current.toLocaleDateString(),
      TimeOfAction: current.toLocaleTimeString(),
      WordEntry: wordEntered,
      IsEntryValid: true,
      IsEntryCorrect:true,
    }
    console.log(current.toLocaleTimeString());
    row += 1; //start new row
    column = 0;
  }
  else if (wordEntered != word && WordIsValid(wordEntered.toLowerCase()) == true){
    update();
    let current = new Date();
    console.log(current.toLocaleDateString());
    console.log(current.toLocaleTimeString());
    const action = {
      Username: username,
      DateOfAction: current.toLocaleDateString(),
      TimeOfAction: current.toLocaleTimeString(),
      WordEntry: wordEntered,
      IsEntryValid: true,
      IsEntryCorrect:false,
    }
    console.log(current.toLocaleTimeString());
    row += 1; //start new row
    column = 0;
  }
  else{
    let current = new Date();
    console.log(current.toLocaleDateString());
    console.log(current.toLocaleTimeString());
    const action = {
      Username: username,
      DateOfAction: current.toLocaleDateString(),
      TimeOfAction: current.toLocaleTimeString(),
      WordEntry: wordEntered,
      IsEntryValid: true,
      IsEntryCorrect:false,
    }
    console.log(current.toLocaleTimeString());
    updateMessage("Invalid Entry: Please enter a valid word")
  }

}


