"use strict";

const numberOfRows = 6; //gives number of trials
let numberOfColumns = 5; // gives the length of the word guessed

let row = 0; //current guess (attempt number)
let column = 0; // current letter for attempt

let isGameOver = false;
let word = "APPLE";

window.onload = function () {
  initialize();
};

function initialize() {
  // creation of the  board
  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfColumns; j++) {
      const block = document.createElement("span");
      block.id = i.toString() + "-" + j.toString();
      block.classList.add("block");

      document.getElementById("gameBoard").appendChild(block);
    }
  }
}

document.addEventListener("click", (e) => {
  if (isGameOver) return;

  //alert(e.code);
  if ("KeyA" <= e.code && e.code <= "KeyZ") {
    if (column < numberOfColumns) {
      const currentBlock = document.getElementById(
        row.toString() + "-" + column.toString()
      );
      if (currentBlock.innerText == "") {
        currentBlock.innerText = e.code[3];
        column += 1;
      }
    }
  } else if (e.code == "Backspace") {
    if (column > 0 && column <= numberOfColumns) {
      column -= 1;
    }
    const currentBlock = document.getElementById(
      row.toString() + "-" + column.toString()
    );
    currentBlock.innerText = "";
  } else if (e.code == "Enter") {
    update();
    row += 1; //start new row
    column = 0;
  }

  if (!isGameOver && row == numberOfRows) {
    isGameOver = true;
  }
});

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
    } // all letters are in the word in correct positions
    else if (word.includes(letter)) {
      currentBlock.classList.add("inTheWord");
    } //letter is in not in the word
    else {
      currentBlock.classList.add("notInWord");
    }

    if (correctWord == numberOfColumns) {
      isGameOver = true;
    }
  }
}
