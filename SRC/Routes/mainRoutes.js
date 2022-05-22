"use strict";

const path = require("path");
const express = require("express");
const mainRouter = express.Router();
mainRouter.get("/singlePlayer", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "Views", "singlePlayer.html"));
});
module.exports = mainRouter;
