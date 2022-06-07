"use strict";

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

//const Users = require("./SRC/Models/user");
const serverResponses = require("./SRC/serverResponse");
const hashing = require("bcrypt");
const server = require("http").createServer(app);
const mainRouter = require("./SRC/Routes/mainRoutes");
//const mainRouter = express.Router();

//for checking if the user is logged in
let user_login = false;

// connect to mango DB
const mangoDB =
  "mongodb://mongodb-group-6:e0kJieT4LjeSE9Hr8ERriujxAAFPhIWD9Olv3onHO21zshBtm74XuOW7oZRCkegC7o4K3HzVnk2yf9OurMuZuA%3D%3D@mongodb-group-6.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@mongodb-group-6@";

const { Socket } = require("socket.io");

app.use(mainRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("node_modules"));
app.use("/SRC/Public/Styles", express.static(__dirname + "/SRC/Public/Styles"));
app.use(
  "/SRC/Public/Scripts",
  express.static(__dirname + "/SRC/Public/Scripts")
);

const io = require("socket.io")(server);

io.on("connection", (sock) => {
  serverResponses.Initialize(io, sock);
});

module.exports = app;

server.listen(process.env.PORT || 3000);
console.log("Express server running on port 3000");
