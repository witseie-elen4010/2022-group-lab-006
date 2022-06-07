"use strict";

let gameMode = 0;
const gameID = Math.floor(Math.random() * 10000000) + 1000000;
const sock = io();
const button = document.getElementById("idButton");
const store = document.getElementById("Store");
const mode1 = document.getElementById("mode1");
const mode2 = document.getElementById("mode2");

//const input = document.getElementById("test");

//SOCKET LISTENERS

//sock.on("gameHosted", mode2Handler);

//EVENT LISTENERS
button?.addEventListener("click", gameIdHandler, false);
store?.addEventListener("click", iDstorageHandler, false);
mode1?.addEventListener("click", mode1Handler, false);
mode2?.addEventListener("click", mode2Handler, false);

function gameIdHandler() {
  document.getElementById("gameIdOutput").textContent = gameID;
}

function iDstorageHandler() {
  let id = gameID;
  localStorage.clear();
  localStorage.setItem("id", id);
  console.log(id);
  //sock.emit("gameHosted", id);
}

function mode1Handler() {
  gameMode = 1;
  localStorage.setItem("gameMode", gameMode);
  //console.log(gameMode);
  //  const details = gameID;
  // console.log(gameID);
}

function mode2Handler() {
  gameMode = 2;
  localStorage.setItem("gameMode", gameMode);
  //console.log(gameMode);
  const details = gameID;
  //sock.emit("gameHosted", details);
}
