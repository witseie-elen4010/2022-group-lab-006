"use strict";

const path = require("path");
const express = require("express");
const { check } = require("express-validator");
const mainRouter = express.Router();


mainRouter.get("/singlePlayer", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "Views", "singlePlayer.html"));
});

// Route for the login Page 
mainRouter.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "Views", "login.html"));
});

// Route for the Registration Page
mainRouter.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "Views", "register.html"));
});

// Route for the Home Page
mainRouter.get("/home", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "Views", "home.html"));
});

// Route for the Update Page
mainRouter.get("/update", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "Views", "update.html"));
});

// Route for the Multiplayer Page
mainRouter.get("/multiplayer", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "Views", "multiPlayer.html"));
});

module.exports = mainRouter;
