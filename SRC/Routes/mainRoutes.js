"use strict";

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const Users = require("./Models/user");
const hashing = require("bcrypt");
const mainRouter = express.Router();

mainRouter.use(bodyParser.json());
mainRouter.use(bodyParser.urlencoded({ extended: false }));
mainRouter.use(
  "/SRC/Public/Styles",
  express.static(__dirname + "/SRC/Public/Styles")
);
mainRouter.use(
  "/SRC/Public/Scripts",
  express.static(__dirname + "/SRC/Public/Scripts")
);
let user_login = false;
// connect to mango DB
const mangoDB =
  "mongodb://mongodb-group-6:e0kJieT4LjeSE9Hr8ERriujxAAFPhIWD9Olv3onHO21zshBtm74XuOW7oZRCkegC7o4K3HzVnk2yf9OurMuZuA%3D%3D@mongodb-group-6.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@mongodb-group-6@";

//using mangoose to interact with mangoDB Database
mongoose
  .connect(mangoDB)
  .then((result) => console.log("connected to Database"))
  .catch((err) => console.log(err));

// Function for validating user login credentials
const check = async function (username, password) {
  const user = await Users.findOne({ username: username });
  if (user == null) {
    return false;
  } else {
    const match = await user.comparePassword(password);
    console.log(match);
    if (match == true) {
      return true;
    } else {
      return false;
    }
  }
};

// Function for updating user login credentials
const updateDetails = async function (username, password, newPassword) {
  const user = await Users.findOne({ username: username });
  if (user == null) {
    return false;
  } else {
    const match = await user.comparePassword(password);
    console.log(match);
    if (match == true) {
      const saltRounds = await hashing.genSalt(12);
      const passwordHashed = await hashing.hash(newPassword, saltRounds);
      const user = await Users.updateOne(
        { username: username },
        { $set: { password: passwordHashed } }
      );
      return true;
    } else {
      return false;
    }
  }
};

//function to verify login details using Database
mainRouter.post("/", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const valid = check(username, password)
    .then((result) => {
      if (result == true) {
        user_login = true;
        res.sendFile(path.join(__dirname, "..", "Views", "home.html"));
      } else {
        res.sendFile(path.join(__dirname, "..", "Views", "login.html"));
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendFile(path.join(__dirname, "..", "Views", "beginnerLevel.html"));
    });
});

//function to update login details using Database
mainRouter.post("/update", function (req, res) {
  const username = req.body.username;
  const currentPassword = req.body.password;
  const newPassword = req.body.npassword;
  const valid = updateDetails(username, currentPassword, newPassword)
    .then((result) => {
      if (result == true) {
        res.sendFile(path.join(__dirname, "..", "Views", "home.html"));
      } else {
        res.sendFile(__dirname + "/SRC/views/update.html");
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendFile(__dirname + "/SRC/views/login.html");
    });
  console.log("we are out of the loop");
});

// Function to store user details after registration
mainRouter.post("/register", function (req, res) {
  console.log(req.body);
  const username = req.body.username;
  const password2 = req.body.password;
  const email = req.body.email;
  const user = new Users({
    username: username,
    email: email,
    password: password2,
  });
  user
    .save()
    .then((result) => {
      res.sendFile(__dirname + "/SRC/views/login.html");
    })
    .catch((err) => {
      console.log(err);
    });
});

//route for the single player

mainRouter.get("/singlePlayer", function (req, res) {
  if (user_login == true) {
    res.sendFile(path.join(__dirname, "..", "Views", "levelsPage.html"));
  } else if (user_login == false) {
    res.sendFile(path.join(__dirname, "..", "Views", "login.html"));
  }
});

//route for Levels Page
mainRouter.get("/levelsPage", function (req, res) {
  if (user_login == true) {
    res.sendFile(path.join(__dirname, "..", "Views", "levelsPage.html"));
  } else if (user_login == false) {
    res.sendFile(path.join(__dirname, "..", "Views", "login.html"));
  }
});

//route for beginner level
mainRouter.get("/beginnerLevel", function (req, res) {
  if (user_login == true) {
    res.sendFile(path.join(__dirname, "..", "Views", "beginnerLevel.html"));
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
  if (user_login == true) {
    res.sendFile(path.join(__dirname, "..", "Views", "home.html"));
  } else if (user_login == false) {
    res.sendFile(path.join(__dirname, "..", "Views", "login.html"));
  }
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

mainRouter.get("/Lobby", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "Views", "Lobby.html"));
});

mainRouter.get("/Hosting", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "Views", "Hosting.html"));
});

module.exports = mainRouter;
