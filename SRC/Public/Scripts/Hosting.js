"use strict";

const playerNum = document.getElementById("myButton");
let numOfPlayers = 1;
let gameMode = 0;
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
    let players_ = numOfPlayers;

    localStorage.clear();
    localStorage.setItem("id", id);
    localStorage.setItem("players_", players_);

    console.log(id);
    console.log(players_);
  },
  false
);

const mode1 = document.getElementById("mode1");

mode1?.addEventListener(
  "click",
  function () {
    gameMode = 1;
    localStorage.setItem("gameMode", gameMode);

    console.log(gameMode);
  },
  false
);

const mode2 = document.getElementById("mode2");

mode2?.addEventListener(
  "click",
  function () {
    gameMode = 2;
    localStorage.setItem("gameMode", gameMode);

    console.log(gameMode);
  },
  false
);
