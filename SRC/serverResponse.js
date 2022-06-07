"use strict";

let io;
let Socket;

exports.Initialize = function (i_o, sock) {
  Socket = sock;
  io = i_o;
  console.log(Socket.id, "connected");
  Socket.on("addBoard", sendMessage);
  Socket.on("gameHost", gameDetails);
  Socket.on("opponentJoin", JoinClicked);
};

function sendMessage(text) {
  this.emit("addBoard", text);
  console.log(text);
}

function gameDetails(gameID) {
  console.log(gameID);
  const details = { gameid: gameID, mySockID: Socket.id };
  this.emit("gameHosted", details);
  this.join(gameID);
}

function JoinClicked(joiningDetails) {
  const gameroom = Socket.adapter.rooms.has(joiningDetails.gameId);

  console.log("Room", gameroom, "created");
  if (Socket.adapter.rooms.has(joiningDetails.gameId)) {
    this.join(joiningDetails.gameId);
    io.sockets.in(data.gameId).emit("opponentJoined", gameroom);
  } else {
    this.emit("err", { message: "The game room  does not exist" });
  }
}
