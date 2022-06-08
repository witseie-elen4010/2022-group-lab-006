"use strict";
const numberOfRows = 6; //gives number of trials
let numberOfColumns = 5; // gives the length of the word guessed
let game_id;
let gameMode;
let user = 0;
let gameRole;
let accountID;
let oponnentID;
let playerOne;
let playerTwo;
let row = 0; //current guess (attempt number)
let column = 0; // current letter for attempt
let opCol = 5;
let opRow = 0;
var userDetails = {};
var numUsers = {};
let isGameOver = false;
let startGame = false;
let word = "APPLE";
let l = "";
let b = "";
let w = "";
const join = document.getElementById("join");
const host = document.getElementById("host");
// const socket = io("http://localhost:3000/singlePlayer");
//import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
//const io = require("https://cdn.socket.io/4.4.1/socket.io.esm.min.js");
//import { io } from "socket.io-client";
const socket = io();
//import * as io from 'socket.io-client';

socket.on("message", (message) => {
  console.log(message);
});

socket.on("lm", (l, col, row) => {
  //console.log(l);
  addLetter(l, col, row);
  //update();
});
socket.on("delm", (l, col, row) => {
  del(l, col, row);
});
socket.on("update1", (column) => {
  console.log(column);
  //console.log(message);
  //currentBlock.innerText = l
  //addLetter(l);
  //update();
  compare(column);
});
socket.on("update1", (column) => {
  console.log(column);
  //console.log(message);
  //currentBlock.innerText = l
  //addLetter(l);
  //update();
  compare(column);
});

window.onload = function () {
  initialize();
  initialize1();
};

function gameStart() {
  initialize();
  initialize1();
}
var games = [];
var players = [];
function game_details(game_id, users) {
  this.game_id = game_id;
  this.users = users;
}

host.addEventListener(
  "click",
  () => {
    let n;
    socket.on("N_users", (nUsers) => {
      //let n  = nUsers;
      console.log(nUsers);
      if (nUsers > 1) {
        console.log("User joined");
        let data = { userId: socket.id, userRole: "opponent" };
        userDetails[data.userId] = data.userRole;
        console.log(userDetails);
        socket.emit("setSocketId", data.userId, data.userRole);
      } else if (nUsers <= 1) {
        let data = { userId: socket.id, userRole: "host" };
        userDetails[data.userId] = data.userRole;
        console.log(data.userRole);
        socket.emit("setSocketId", data.userId, data.userRole);
      }
    });

    game_id = window.prompt("Please Enter Hosting ID");
    startGame = true;
    //gameMode = window.prompt("Please Enter Game Mode");
    //game_id = game_room.value
    //let mode = localStorage.getItem("gameMode");
    //let id = localStorage.getItem("id");
    games.push(new game_details(game_id, 1));
    console.log(startGame);
    //console.log(n);
    //gameStart();
    socket.emit("join_game", game_id);
    check_usersRole(userDetails, socket.id);
    // console.log(game_id);
  },
  false
);
socket.on("userDetails", (role) => {
  console.log(role);
});
function check_usersRole(object, key) {
  //return Object.keys(object).find(key => object[key] === value);
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      // console.log(key, object[key]);
      return object[key];
    }
  }
}
join.addEventListener(
  "click",
  () => {
    let n;
    socket.on("N_users", (nUsers) => {
      //let n  = nUsers;
      console.log(nUsers);
      if (nUsers > 1) {
        console.log("User joined");
        let data = { userId: socket.id, userRole: "opponent" };
        userDetails[data.userId] = data.userRole;
        console.log(userDetails);
        socket.emit("setSocketId", data.userId, data.userRole);
      } else if (nUsers <= 1) {
        let data = { userId: socket.id, userRole: "host" };
        userDetails[data.userId] = data.userRole;
        console.log(data.userRole);
        socket.emit("setSocketId", data.userId, data.userRole);
      }
    });

    game_id = window.prompt("Please Enter Game ID for game you wanna join");
    startGame = true;
    //gameMode = window.prompt("Please Enter Game Mode");
    //game_id = game_room.value
    //let mode = localStorage.getItem("gameMode");
    //let id = localStorage.getItem("id");
    games.push(new game_details(game_id, 1));
    console.log(startGame);
    //console.log(n);
    //gameStart();
    socket.emit("join_game", game_id);
    check_usersRole(userDetails, socket.id);
    // console.log(game_id);
  },
  false
);

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
function initialize1() {
  // creation of the  board
  for (let i = 0; i < numberOfRows; i++) {
    for (let j = numberOfColumns; j < 2 * numberOfColumns; j++) {
      const block1 = document.createElement("span");
      block1.id = i.toString() + "-" + j.toString();
      block1.classList.add("block1");

      document.getElementById("gameBoard1").appendChild(block1);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  var lose = document.getElementById("game_lose");
  var win = document.getElementById("game_win");
  var x = document.getElementById("keyboard-container");
  var boards = document.getElementById("boards");
  document.getElementById("correctWord").innerHTML = word;
  var cor = document.getElementById("correctWord");
  const keys = document.querySelectorAll(".keyboard-row button");
  console.log(startGame);
  /*
  if(startGame==true){
    boards.style.display = "block";
    x.style.display = "block";
  }
  else if(startGame != true){
    boards.style.display = "none";
    x.style.display = "none";
  }
  */
  if (isGameOver != true) {
    win.style.display = "none";
    lose.style.display = "none";
    cor.style.display = "none";
  }
  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");
      let role = check_usersRole(userDetails, socket.id);
      console.log(role);
      if (isGameOver) return;

      //alert(e.code);
      if (letter != "del" && letter != "enter") {
        if (role == "host") {
          column = addLetter(letter, column, row);
          l = letter;
          socket.emit("l", l, game_id, column - 1, row);
        }
        if (role == "opponent") {
          opCol = addLetter(letter, opCol, opRow);
          l = letter;
          socket.emit("l", l, game_id, opCol - 1, opRow);
        }
      } else if (letter == "del") {
        if (role == "host") {
          l = "";
          column = del(l, column, row);
          socket.emit("del", l, game_id, column, row);
        }
        if (role == "opponent") {
          l = "";
          opCol = del(l, opCol, opRow);
          socket.emit("del", l, game_id, opCol, opRow);
        }
        //del();
      } else if (letter == "enter") {
        if (role == "host") {
          socket.emit("update", column);
          enter();
        }
        if (role == "opponent") {
          socket.emit("update", opCol);
          enter();
        }
      }

      if (!isGameOver && row == numberOfRows) {
        isGameOver = true;
        x.style.display = "none";
        lose.style.display = "block";
        cor.style.display = "block";
      }
    };
  }
});

function addLetter(letter, column, row) {
  if (column < 2 * numberOfColumns) {
    console.log(column);
    console.log(row);
    const currentBlock = document.getElementById(
      row.toString() + "-" + column.toString()
    );
    //b = currentBlock;

    if (currentBlock.innerText == "") {
      currentBlock.innerText = letter;
      //l = letter;
      //currentBlock.innerText = l
      //socket.emit("l", l);
      column += 1;
      console.log(column);
      //console.log(l);
      //socket.emit("l", l);
    }
  }
  return column;
}

let correct = 0;
function del(l, column, row) {
  if (column > 0 && column <= 2 * numberOfColumns) {
    column -= 1;
  }
  const currentBlock = document.getElementById(
    row.toString() + "-" + column.toString()
  );
  currentBlock.innerText = l;
  return column;
}

function enter() {
  //socket.emit("l", l);
  update();
  //socket.emit("l", l);
}

function compare(column, row) {
  const keys = document.querySelectorAll(".keyboard-row button");
  for (let i = column - numberOfColumns; i < column; i++) {
    const currentBlock = document.getElementById(
      row.toString() + "-" + i.toString()
    );

    let letter = currentBlock.innerText;
    l = letter;

    //a letter is in correct position
    if (word[i] == letter) {
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].getAttribute("data-key") == letter.toLocaleLowerCase()) {
          keys[i].style.backgroundColor = "#6aa646";
        }
      }
      currentBlock.classList.add("wordCorrect");
      correct += 1;
    } // all letters are in the word in wrong positions
    else if (word.includes(letter)) {
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].getAttribute("data-key") == letter.toLocaleLowerCase()) {
          keys[i].style.backgroundColor = "#c9b458";
        }
      }
      currentBlock.classList.add("inTheWord");
    } //letter is in not in the word
    else {
      currentBlock.classList.add("notInWord");
    }
  }
}

function update() {
  var win = document.getElementById("game_win");
  var x = document.getElementById("keyboard-container");
  var cor = document.getElementById("correctWord");
  correct = 0;
  const keys = document.querySelectorAll(".keyboard-row button");
  let role = check_usersRole(userDetails, socket.id);
  if (role == "host") {
    if (column == 5) {
      compare(column, row);
      row += 1; //start new row
      column = 0;
      if (correct == numberOfColumns) {
        isGameOver = true;
        x.style.display = "none";
        win.style.display = "block";
        cor.style.display = "block";
        //window.alert("Congratulations!");
      }
    } else {
      window.alert("Not enough letters");
    }
  }
  if (role == "opponent") {
    if (opCol == 10) {
      compare(opCol, opRow);
      opRow += 1; //start new row
      opCol = numberOfColumns;
      if (correct == numberOfColumns) {
        isGameOver = true;
        x.style.display = "none";
        win.style.display = "block";
        cor.style.display = "block";
        //window.alert("Congratulations!");
      }
    } else {
      window.alert("Not enough letters");
    }
  }
}
