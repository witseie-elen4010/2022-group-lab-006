"use strict";

const path = require("path");
const express = require("express");
const { check } = require("express-validator");
const mainRouter = express.Router();
const user_login = true;
//route for the single player

mainRouter.get("/singlePlayer", function (req, res) {
  if (user_login == true) {
    res.sendFile(path.join(__dirname, "..", "Views", "singlePlayer.html"));
  } else if (user_login == false) {
    res.sendFile(path.join(__dirname, "..", "Views", "login.html"));
  }
});
// Route for the landing Page
mainRouter.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "Views", "landing.html"));
});
// Route for the login Page
mainRouter.get("/login", function (req, res) {
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
  if (user_login == true) {
    res.sendFile(path.join(__dirname, "..", "Views", "update.html"));
  } else if (user_login == false) {
    res.sendFile(path.join(__dirname, "..", "Views", "login.html"));
  }
});

// Route for the Multiplayer Page
mainRouter.get("/multiplayer", function (req, res) {
  if (user_login == true) {
    res.sendFile(path.join(__dirname, "..", "Views", "multiPlayer.html"));
  } else if (user_login == false) {
    res.sendFile(path.join(__dirname, "..", "Views", "login.html"));
  }
});

// Route for the Multiplayer Page
mainRouter.get("/rules", function (req, res) {
  if (user_login == true) {
    res.sendFile(path.join(__dirname, "..", "Views", "rules.html"));
  } else if (user_login == false) {
    res.sendFile(path.join(__dirname, "..", "Views", "login.html"));
  }
});

mainRouter.get("/Hosting", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "Views", "Hosting.html"));
});

mainRouter.get("/Lobby", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "Views", "Lobby.html"));
});

mainRouter.get("/multiPlayerMode1", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "Views", "multiPlayerMode1.html"));
});

mainRouter.get("/multiPlayerMode2", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "Views", "multiPlayerMode2.html"));
});

module.exports = mainRouter;
