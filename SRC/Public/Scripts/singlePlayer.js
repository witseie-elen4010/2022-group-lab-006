"use strict";

const numberOfRows = 6; //gives number of trials
const numberOfColumns = 5; // gives the length of the word guessed

let row = 0; //current guess (attempt number)
let column = 0; // current letter for attempt

let isGameOver = false;

let word = "APPLE";

//creating time
let startTime;
let endTime;

 function start() {
  startTime = new Date();
}
//function when time ends
function end() {
  endTime = new Date();

  let timeElapse = endTime - startTime; //in ms
  timeElapse = timeElapse/10000
  console.log(timeElapse)
  alert(timeElapse)
  
}


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

}
start();
const inputLetter = (key) => {
  
 if (isGameOver) return;

  //alert(e.code);
  if (column < numberOfColumns && row< numberOfRows) {

    const currentBlock = document.getElementById(row.toString() + "-" + column.toString());
    if (currentBlock.textContent == "" && key.length == 1) {
       currentBlock.textContent = key;
       column += 1;
    }
  }
  if (key == "backspace" && column > 0) {
        column-= 1
        const currentBlock = document.getElementById(row.toString() + "-" + column.toString());
        currentBlock.textContent = "";
    }
  if (key == "enter" && column == 5) {
      update();
      row += 1; //start new row
      column = 0;
    }

    if (!isGameOver && row == numberOfRows) {
      isGameOver = true;
      
      updateMessage("Better Luck Next Time")
     end();
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
      if(correct == 5){
        isGameOver = true
        updateMessage("Congradulations You win")
        end();
      }
      
    } // all letters are in the word in correct positions
    else if (word.includes(letter)) {
      currentBlock.classList.add("inTheWord");
    } //letter is in not in the word
    else {
      currentBlock.classList.add("notInWord");
    }
  }
};

