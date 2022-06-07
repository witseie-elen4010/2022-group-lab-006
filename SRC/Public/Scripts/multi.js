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
//import {io} from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js"
const socket = io();
///socket.io/socket.io.js
//import * as io from 'socket.io-client';
//const io = require("https://cdn.socket.io/4.4.1/socket.io.esm.min.js"); 
socket.on("message", message => {
  console.log(message);
 
})
window.onload = function () {
  initialize();
  initialize1();
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
  function initialize1() {
    // creation of the  board
    for (let i = 0; i < numberOfRows; i++) {
      for (let j = numberOfColumns; j < 2*numberOfColumns; j++) {
        const block1 = document.createElement("span");
        block1.id = i.toString() + "-" + j.toString();
        block1.classList.add("block1");
  
        document.getElementById("gameBoard1").appendChild(block1);
      }
    }
  }
  socket.on("userDetails", role =>{
    console.log(role);
  })
  function check_usersRole(object, key){
    for(var key in object){
      if(object.hasOwnProperty(key)){
       
       return object[key];
      }
    }
  }
join.addEventListener( "click", () => {
    let n;
    socket.on("N_users", nUsers => {
      //let n  = nUsers;
      console.log(nUsers);
      if(nUsers>1){
        console.log("User joined")
        let data={userId:socket.id, userRole:"opponent"}
        userDetails[data.userId] = data.userRole;
        console.log(userDetails)
        socket.emit('setSocketId', data.userId, data.userRole);
      }
      else if (nUsers<=1){
        let data={userId:socket.id, userRole:"host"}
        userDetails[data.userId] = data.userRole;
        console.log(data.userRole)
        socket.emit('setSocketId', data.userId, data.userRole);
      }
    })
    
      game_id = window.prompt("Please Enter Game ID for game you wanna join");
      startGame = true;
  
      games.push(new game_details(game_id, 1));
      console.log(startGame);
      
      socket.emit('join_game', game_id);
      check_usersRole(userDetails, socket.id);
     
    },
    false
  );
  host.addEventListener( "click", () => {
    let n;
    socket.on("N_users", nUsers => {
      //let n  = nUsers;
      console.log(nUsers);
      if(nUsers>1){
        console.log("User joined")
        let data={userId:socket.id, userRole:"opponent"}
        userDetails[data.userId] = data.userRole;
        console.log(userDetails)
        socket.emit('setSocketId', data.userId, data.userRole);
      }
      else if (nUsers<=1){
        let data={userId:socket.id, userRole:"host"}
        userDetails[data.userId] = data.userRole;
        console.log(data.userRole)
        socket.emit('setSocketId', data.userId, data.userRole);
      }
    })
    
      game_id = window.prompt("Please Enter Hosting ID");
      startGame = true;
      games.push(new game_details(game_id, 1));
      console.log(startGame);
      
      socket.emit('join_game', game_id);
      check_usersRole(userDetails, socket.id);
      
    },
    false
  );
  function addLetter(letter, column, row){
  
    if (column < 2*numberOfColumns) {
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
    return column
  };
  let correct = 0;
function del(){
  if (column > 0 && column <= numberOfColumns) {
    column -= 1;
  }
  const currentBlock = document.getElementById(
    row.toString() + "-" + column.toString()
  );
  currentBlock.innerText = "";
};
function compare(column){
    const keys = document.querySelectorAll(".keyboard-row button");
    for (let i = column-numberOfColumns; i < column; i++) {
      const currentBlock = document.getElementById(
        row.toString() + "-" + i.toString()
      );
  
      let letter = currentBlock.innerText;
      l = letter;
      
      //a letter is in correct position
      if (word[i] == letter) {
        for (let i = 0; i < keys.length; i++) {
          if(keys[i].getAttribute("data-key")==letter.toLocaleLowerCase()){
            keys[i].style.backgroundColor = "#6aa646";
          }
        }
        currentBlock.classList.add("wordCorrect");
        correct += 1;
  
      } // all letters are in the word in wrong positions
      else if (word.includes(letter)) {
        for (let i = 0; i < keys.length; i++) {
          if(keys[i].getAttribute("data-key")==letter.toLocaleLowerCase()){
            keys[i].style.backgroundColor = "#c9b458";
          }
        }
        currentBlock.classList.add("inTheWord");
      } //letter is in not in the word
      else {
        
        currentBlock.classList.add("notInWord");
      }
  
  }
  };
function update() {
    var win = document.getElementById("game_win");
    var x = document.getElementById("keyboard-container");
    var cor = document.getElementById("correctWord");
    correct = 0;
    const keys = document.querySelectorAll(".keyboard-row button");
    let role = check_usersRole(userDetails, socket.id);
    if(role == "host"){
    if (column==5){
      compare(column);
      row += 1; //start new row
      column = 0;
      if (correct == numberOfColumns) {
        isGameOver = true;
        x.style.display = "none";
        win.style.display = "block";
        cor.style.display = "block";
        //window.alert("Congratulations!");
      }
    }
    else{
      window.alert('Not enough letters');
    }
    }
    if(role == "opponent"){
      if (opCol==10){
        compare(opCol);
        opRow += 1; //start new row
        opCol = numberOfColumns;
        if (correct == numberOfColumns) {
          isGameOver = true;
          x.style.display = "none";
          win.style.display = "block";
          cor.style.display = "block";
          //window.alert("Congratulations!");
        }
      }
      else{
        window.alert('Not enough letters');
      }
      }
      
  };
  function enter(){
    //socket.emit("l", l);
    update();
    //socket.emit("l", l);
  };
  document.addEventListener("DOMContentLoaded", () =>  {
    var lose = document.getElementById("game_lose");
    var win = document.getElementById("game_win");
    var x = document.getElementById("keyboard-container");
    var boards = document.getElementById("boards");
    document.getElementById("correctWord").innerHTML= word;
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
     if(isGameOver != true){
      win.style.display = "none";
      lose.style.display = "none";
      cor.style.display = "none";
    }
    for (let i = 0; i < keys.length; i++) {
      keys[i].onclick = ({ target }) => {
        const letter = target.getAttribute("data-key");
        let role = check_usersRole(userDetails, socket.id)
        console.log(role);
      if (isGameOver) return;
  
      //alert(e.code);
      if (letter != "del" && letter != "enter") {
        if(role == "host"){
          column = addLetter(letter, column, row);
          l = letter;
          socket.emit("l", l, game_id, column-1, row);
        }
        if(role == "opponent"){
          opCol = addLetter(letter, opCol, opRow);
          l = letter;
         socket.emit("l", l, game_id, opCol-1, opRow);
        }
        
        
      } 
      else if (letter == "del") {
        del();
      } else if (letter == "enter") {
        if(role=="host"){
        socket.emit("update", column);
        enter();
        }
        if(role=="opponent"){
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
    }
  }
  });

  
  