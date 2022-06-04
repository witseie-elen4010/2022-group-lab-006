"use strict";

const playerNum = document.getElementById("myButton");
const gameMode = 2;
let numOfPlayers = 1;
playerNum?.addEventListener(
  "click",
  function () {
    numOfPlayers = document.getElementById("Players").value;
  },
  false
);

const button = document.getElementById("idButton");
const gameID = Math.floor(Math.random() * 10000000) + 1000000;

button?.addEventListener(
  "click",
  function () {
    document.getElementById("gameIdOutput").textContent = gameID;
  },
  false
);

const store = document.getElementById("Store");

store?.addEventListener(
  "click",
  function () {
    let id = gameID;
    let mode = gameMode;
    let players_ = numOfPlayers;

    localStorage.setItem("id", id);
    localStorage.setItem("mode", mode);
    localStorage.setItem("players_", players_);

    console.log(id);
    console.log(mode);
    console.log(players_);
  },
  false
);
