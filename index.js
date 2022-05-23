"use strict";

const path = require("path");
const express = require("express");
const mongoose = require('mongoose');
const app = express();

// connect to mango DB
const mangoDB = 'mongodb+srv://Group-6:Group6@users.xqmpw.mongodb.net/Users?retryWrites=true&w=majority';

//using mangoose to interact with mangoDB Database
mongoose.connect(mangoDB)
  .then((result) => console.log('connected to Database'))
  //.then((result) => app.listen(3000))  
  .catch((err)=> console.log(err))

const mainRouter = require("./SRC/Routes/mainRoutes");

app.use(mainRouter);
app.use("/SRC/Public/Styles", express.static(__dirname + "/SRC/Public/Styles"));
app.use(
  "/SRC/Public/Scripts",
  express.static(__dirname + "/SRC/Public/Scripts")
);
module.exports = app;

app.listen(process.env.PORT || 3000);
console.log("Express server running on port 3000");
