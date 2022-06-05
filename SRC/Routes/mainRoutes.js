"use strict";
let user_login = true;

const path = require("path");
const express = require("express");
const { check } = require("express-validator");
const mainRouter = express.Router();

//route for the single player game levels

mainRouter.get("/levelsPage", function (req, res) {

  if(user_login==true)
  {
     res.sendFile(path.join(__dirname, "..", "Views", "levelsPage.html"));
  }
  else if(user_login ==false)
  {
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

  if(user_login ==true)
  { 
     res.sendFile(path.join(__dirname, "..", "Views", "update.html"));
  }
  else if(user_login ==false)
  {
    res.sendFile(path.join(__dirname, "..", "Views", "login.html"));
  }
  

});

// Route for the Multiplayer Page
mainRouter.get("/multiplayer", function (req, res) {

  if(user_login ==true)
  { 
    res.sendFile(path.join(__dirname, "..", "Views", "multiPlayer.html"));
  }
  else if(user_login ==false)
  {
    res.sendFile(path.join(__dirname, "..", "Views", "login.html"));
  }
  
});

// Route for the Multiplayer Page
mainRouter.get("/rules", function (req, res) {
  if(user_login ==true)
  { 
      res.sendFile(path.join(__dirname, "..", "Views", "rules.html"));

  }
  else if(user_login ==false)
  {
    res.sendFile(path.join(__dirname, "..", "Views", "login.html"));
  }

});

mainRouter.get("/Hosting", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "Views", "Hosting.html"));
});

module.exports = mainRouter;
