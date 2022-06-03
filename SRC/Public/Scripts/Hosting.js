"use strict";

document.getElementById("myButton").onclick = function () {
  const numOfPlayers = document.getElementById("Players").value;
  console.log(numOfPlayers, "players");
};

const button = document.getElementById("idButton");

button.addEventListener(
  "click",
  function () {
    const gameID = 9875690;
    document.getElementById("gameIdOutput").textContent = gameID;
  },
  false
);
