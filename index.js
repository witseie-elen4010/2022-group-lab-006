"use strict";

const path = require("path");
const express = require("express");
const app = express();

const mainRouter = require("./SRC/Routes/mainRoutes");

app.use(mainRouter);
app.use("/SRC/public/styles", express.static(__dirname + "/SRC/public/styles"));
module.exports = app;

app.listen(process.env.PORT || 3000);
console.log("Express server running on port 3000");
