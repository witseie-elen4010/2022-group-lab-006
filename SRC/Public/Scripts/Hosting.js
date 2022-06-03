"use strict";

document.getElementById("myButton").onclick = function () {
  const numOfPlayers = document.getElementById("Players").value;
  console.log(numOfPlayers, "players");
};

const button = document.getElementById("idButton");
const gameID = Math.floor(Math.random() * 10000000) + 1000000;
button.addEventListener(
  "click",
  function () {
    //const gameID = 9875690;
    document.getElementById("gameIdOutput").textContent = gameID;
  },
  false
);
