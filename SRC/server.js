// To open server go to your browser and type in "localhost:3000"
"use strict";

const http = require("http");
let express = require("express");
let socketio = require("socket.io");

let app = express();

let server = http.createServer(app);
let io = socketio(server);
/*
const server = http.createServer((req, res) => {
  // console.log('request made')
  console.log(req.url, req.method);
  //res.setHeader('Content-Type','test/plain');
  res.setHeader("Content-Type", "text/html");
  res.write(
    "<p>This is the server will use for testing stuff great, testing 123</p>"
  );
  res.end();
});*/

io.on("connection", (sock) => sock.emit("msg", "Hello"));
app.use(express.static(__dirname + "/SRC/Public/Scripts/multiPlayer"));
//server is listening on port 3000
server.listen(3000, "Localhost", () => {
  console.log("Ready to work");
});
