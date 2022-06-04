"use strict";

const path = require("path");
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser")
const Users = require('./SRC/Models/user')
const hashing = require('bcrypt')

//for checking if the user is logged in
let user_login = false;

// connect to mango DB
const mangoDB = 'mongodb://mongodb-group-6:e0kJieT4LjeSE9Hr8ERriujxAAFPhIWD9Olv3onHO21zshBtm74XuOW7oZRCkegC7o4K3HzVnk2yf9OurMuZuA%3D%3D@mongodb-group-6.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@mongodb-group-6@';

//using mangoose to interact with mangoDB Database
mongoose.connect(mangoDB)
  .then((result) => console.log('connected to Database')) 
  .catch((err) => console.log(err))


const mainRouter = require("./SRC/Routes/mainRoutes");


app.use(mainRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/SRC/Public/Styles", express.static(__dirname + "/SRC/Public/Styles"));
app.use(
  "/SRC/Public/Scripts",
  express.static(__dirname + "/SRC/Public/Scripts")
);

// Function for validating user login credentials
const check = async function (username, password) {
  const user = await Users.findOne({ username: username });
  if (user == null) {
    return false
  }
  else {
    const match = await user.comparePassword(password);
    console.log(match);
    if (match == true) {
      return true
    } else {
      return false
    }
  }
}
 
// Function for updating user login credentials
const updateDetails = async function (username, password, newPassword) {
  const user = await Users.findOne({ username: username });
  if (user == null) {
    return false
  }
  else {
    const match = await user.comparePassword(password);
    console.log(match);
    if (match == true) {
      const saltRounds = await hashing.genSalt(12)
      const passwordHashed = await hashing.hash(newPassword,saltRounds)
      const user = await Users.updateOne({username:username},{$set:{password: passwordHashed}});
      return true
    } else {
      return false
    }
  }
}


//function to verify login details using Database
app.post("/", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const valid=check(username,password)
     .then((result) => {
        if(result == true)
        {
          //if the user is logged in
          user_login = true;
          res.sendFile(__dirname + '/SRC/views/home.html')
        }else{
          res.sendFile(__dirname + '/SRC/views/login.html')
        }
     })
     .catch((err) =>{
         console.log(err)
         res.sendFile(__dirname + '/SRC/views/login.html')
     })
   module.exports.user_login = user_login;
  
});


//function to update login details using Database
app.post("/update", function (req, res) {
  const username = req.body.username;
  const currentPassword = req.body.password;
  const newPassword = req.body.npassword;
  const valid=updateDetails(username,currentPassword,newPassword)
     .then((result) => {
        if(result == true)
        {
          res.sendFile(__dirname + '/SRC/views/login.html')
        }else{
          res.sendFile(__dirname + '/SRC/views/update.html')
        }
     })
     .catch((err) =>{
         console.log(err)
         res.sendFile(__dirname + '/SRC/views/login.html')
     })
  console.log('we are out of the loop')
});

// Function to store user details after registration
app.post("/register", function (req, res) {
  console.log(req.body)
  const username = req.body.username;
  const password2 = req.body.password;
  const email = req.body.email;
  const user = new Users({
    username: username,
    email: email,
    password: password2
  })
  user.save()
    .then((result) => {
      res.sendFile(__dirname + '/SRC/views/login.html')
    })
    .catch((err) => {
      console.log(err)
    })
});



module.exports = app;

app.listen(process.env.PORT || 3000);
console.log("Express server running on port 3000");
