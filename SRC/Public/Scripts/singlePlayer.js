"use strict";

const numberOfRows = 6; //gives number of trials
let numberOfColumns = 5; // gives the length of the word guessed

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
