"use strict";

const path = require("path");
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");

//const Users = require("./SRC/Models/user");
//const serverResponses = require("./SRC/serverResponse");
const hashing = require("bcrypt");
const server = require("http").createServer(app);
const mainRouter = require("./SRC/Routes/mainRoutes");
//const mainRouter = express.Router();

//for checking if the user is logged in
let user_login = false;

// connect to mango DB
const mangoDB ="mongodb://mongodb-group-6:e0kJieT4LjeSE9Hr8ERriujxAAFPhIWD9Olv3onHO21zshBtm74XuOW7oZRCkegC7o4K3HzVnk2yf9OurMuZuA%3D%3D@mongodb-group-6.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@mongodb-group-6@";

const { Socket } = require("socket.io");
var userNames = {};
var numUsers = {};
// const socket = require('socket.io');
const io = require('socket.io')(server,{
  cors:{
      origin: ["http://localhost:3000/multi"]
  },
});

app.use(mainRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("node_modules"));
app.use("/SRC/Public/Styles", express.static(__dirname + "/SRC/Public/Styles"));
app.use(
  "/SRC/Public/Scripts",
  express.static(__dirname + "/SRC/Public/Scripts")
);

//const io = require("socket.io")(server);

//io.on("connection", (sock) => {
  //serverResponses.Initialize(io, sock);
//});

module.exports = app;

server.listen(process.env.PORT || 3000);
console.log("Express server running on port 3000");
io.on('connection', socket => {
  
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.emit("message", "welcom");
  socket.on('disconnect',  () => {
     console.log('A user disconnected');
  });
  //update across game room on server
  socket.on('update', column =>{
    console.log(column)
    socket.emit('updatel', column);
  })
  //update color across game room on server
  socket.on('change', (row, col, color)=>{
    console.log(column)
    socket.broadcast.emit('update2', row, col, color);
  })
  //diplay output across game room
  socket.on('l', (l, game_id, col, row) =>{
    console.log(l)
    console.log(game_id)
    if(game_id == ""){
      console.log("no id")
      socket.broadcast.emit('lm', l, col, row);
    }
    else{
      socket.to(game_id).emit('lm', l, col, row);
      //startGame = true;
    }
  })
  //Create game rooms
  socket.on('join_game', game_id =>{
    console.log(game_id);
    console.log("hello");
    socket.join(game_id);
    
    socket.game_id = game_id;
    if(numUsers[game_id] == undefined){
      numUsers[game_id] = 1;
    }
    else{
      numUsers[game_id]++;
    }
    console.log( numUsers[game_id]);
    socket.emit("N_users", numUsers[game_id])
  })
  socket.on('setSocketId', (userId, userRole)=>{
    //var userId = data.userId;
    //var userRole = data.userRole;
    userNames[userId] = userRole;
    console.log(userId);
    socket.emit("userDetails", userNames[userId])
  })
});

