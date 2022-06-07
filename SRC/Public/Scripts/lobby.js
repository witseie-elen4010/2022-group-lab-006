const sock = io();
const lobbygameID = document.getElementById("gameID");
const lobbygameMode = document.getElementById("Mode");
const getGameDetails = document.getElementById("getGameDetails");
const detailsBox = document.getElementById("details");
const start_game = document.getElementById("startGame");

sock.on("gameHosted", writeConsole);
sock.on("opponentJoined", opponentJoinedGame);

function opponentJoinedGame(gameroom) {
  //location.replace("/multiPlayerMode1");
  console.log(gameroom);
}

function writeConsole(details) {
  console.log(details.gameid, "From Server");
}

getGameDetails?.addEventListener("click", lobbyGameDetails, false);
start_game?.addEventListener("click", opponentJoinedGame, false);

function lobbyGameDetails() {
  detailsBox.textContent = "";
  let gameid = localStorage.getItem("id");
  let gamemode = localStorage.getItem("gameMode");
  detailsBox.innerHTML += `<li>
                     <p> Game ID: ${gameid}</p>
                     </li>
                     <li>
                     <p> Game Mode: ${gamemode}</p>
                       </li>`;

  sock.emit("gameHosted", gameid);
}

function gameStart() {
  let gameid = localStorage.getItem("id");
  let gamemode = localStorage.getItem("gameMode");
  joiningDetails = { gameId: gameid, game_mode: gamemode };
  sock.emit("opponentJoin", joiningDetails);
}
