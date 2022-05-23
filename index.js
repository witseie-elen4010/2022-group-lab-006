"use strict";

const path = require("path");
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser")



// connect to mango DB
const mangoDB = 'mongodb+srv://Group-6:Group6@users.xqmpw.mongodb.net/Users?retryWrites=true&w=majority';

//using mangoose to interact with mangoDB Database
mongoose.connect(mangoDB)
  .then((result) => console.log('connected to Database'))
  //.then((result) => app.listen(3000))  
  .catch((err)=> console.log(err))

const mainRouter = require("./SRC/Routes/mainRoutes");

app.use(mainRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/SRC/Public/Styles", express.static(__dirname + "/SRC/Public/Styles"));
//app.use(express.json())
app.use(
  "/SRC/Public/Scripts",
  express.static(__dirname + "/SRC/Public/Scripts")
);

app.post("/", function (req, res) {
  const username =req.body.username;
  const password =req.body.password;
  console.log(username);
  console.log(password);
});

app.post("/register", function (req, res) {
  const username =req.body.username;
  const password =req.body.password;
  const email= req.body.email;
  console.log(username);
  console.log(password2);
  console.log(email);
  //res.sendFile(path.join(__dirname, "..", "Views", "register.html"));
});
module.exports = app;

app.listen(process.env.PORT || 3000);
console.log("Express server running on port 3000");
