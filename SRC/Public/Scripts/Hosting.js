"use strict";

document.getElementById("myButton").onclick = function () {
  const numOfPlayers = document.getElementById("Players").value;
  console.log(numOfPlayers, "players");
};

document.getElementById("idButton").onclick = function () {
  const gameID = 1845601;
  document.getElementById("gameIdOutput").innerHTML = gameID;
};
