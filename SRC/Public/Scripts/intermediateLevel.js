"use strict";

const numberOfRows = 6; //gives number of trials
const numberOfColumns = 5; // gives the length of the word guessed
const dictionary = ['aries', 'astor', 'eaton', 'norse', 'norte', 'rosen', 
'siena', 'aeons', 'aeros', 'aesir', 'airns', 'airts', 'anise', 'antes', 
'antis', 'antre', 'arise', 'arose', 'arson', 'aster', 'astir', 'atone', 
'aerns', 'entia', 'eosin', 'etnas', 'inert', 'inset', 'inter', 'intra', 
'intro', 'iotas', 'irate', 'irone', 'irons', 'nares', 'naris', 'nates', 
'nears', 'neats', 'neist', 'nerts', 'niter', 'nites', 'nitre', 'nitro', 
'noirs', 'noise', 'noria', 'noris', 'noter', 'notes', 'oaten', 'oater', 
'onset', 'orate', 'ornis', 'osier', 'ostia', 'rains', 'raise', 'ranis', 
'rants', 'rates', 'ratio', 'ratos', 'reins', 'rents', 'resin', 'retia', 
'riant', 'rinse', 'riots', 'risen', 'rites', 'roans', 'roast', 'roset', 
'rosin', 'rotas', 'rotes', 'rotis', 'saint', 'saner', 'santo', 'sarin', 
'satin', 'senor', 'senti', 'serai', 'serin', 'seton', 'siren', 'sitar', 
'snare', 'snore', 'snort', 'sonar', 'stain', 'stair', 'stane', 'stare', 
'stein', 'steno', 'stern', 'stoae', 'stoai', 'stone', 'store', 'stria', 
'tains', 'tares', 'tarns', 'taros', 'tarsi', 'tears', 'tenia', 'tenor', 
'terai', 'terns', 'tiers', 'tinea', 'tines', 'tires', 'tiros', 'toner', 
'tones', 'toras', 'tores', 'torse', 'torsi', 'train', 'trans', 'tries', 
'trine', 'trios', 'trois', 'trona', 'trone'];

let secret = dictionary[Math.floor(Math.random()*dictionary.length)];
let row = 0; //current guess (attempt number)
let column = 0; // current letter for attempt

let isGameOver = false;
let playerWin = false;

let word = secret.toUpperCase();

const gameBoard = document.querySelector('.gameBoard');
const Message = document.querySelector('.Message');
const Hint = document.querySelector('.Hint');

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

const firstHint = function (message) {
    const hintElement =  document.createElement('p');
    hintElement.textContent = message;
    Hint.append(hintElement);
   }

function myString(myWord){
  var val;
  val = myWord;
  return val;
}
  
function revealLetters(myWord){
  return "Word start with " + myWord[0] + ", ends with " + myWord[4];
}

function youLose(myWord){
  return "Better luck next time, word is " + myWord; 
}

const inputLetter = (key) => {
  if (isGameOver) return;

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

    if (!playerWin && row == 0 && key == "enter"){
        update();
        firstHint(revealLetters(word))
    }

    if (key == "enter" && column == 5) {
      update();
      row += 1; //start new row
      column = 0;
    }

    if (!isGameOver && row == numberOfRows) {
      isGameOver = true;
      updateMessage(youLose(word))
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
        playerWin = true
        updateMessage("Congratulations You Win")
      }
    } // all letters are in the word in correct positions
    else if (word.includes(letter)) {
      currentBlock.classList.add("inTheWord");
    } //letter is not in the word
    else {
      currentBlock.classList.add("notInWord");
    }
  }
};