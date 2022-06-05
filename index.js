"use strict";

const path = require("path");
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");

const mainRouter = require("./SRC/Routes/mainRoutes");


app.use(mainRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/SRC/Public/Styles", express.static(__dirname + "/SRC/Public/Styles"));
app.use(
  "/SRC/Public/Scripts",
  express.static(__dirname + "/SRC/Public/Scripts")
);

module.exports = app;

app.listen(process.env.PORT || 3000);
console.log("Express server running on port 3000");