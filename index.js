"use strict";

const path = require("path");
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser")
const Users = require('./SRC/Models/user')



// connect to mango DB
const mangoDB = 'mongodb+srv://Group-6:Group6@users.xqmpw.mongodb.net/Users?retryWrites=true&w=majority';

//using mangoose to interact with mangoDB Database
mongoose.connect(mangoDB)
  //.then((result) => console.log('connected to Database'))
  .then((result) => app.listen(3000))  
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

// Function for validating user login credentials
const check = async function(username, password,res){
  const user = await Users.findOne({ username: username });
  if(user == null){
     return false
  }
  else{
    const match = await user.comparePassword(password);
  //console.log(user)
    console.log(match);
    if (match == true){
      console.log('True is True, hahahaha')
      return true
    }else{
      return true
    }
    
  }
}

app.get('/add-user',(req,res) => {
  const user = new Users({
      username: 'Group6',
      email: 'group6@gmail.com',
      password: 'group6'
  })
  user.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) =>{
        console.log(err)
    })
})

app.get('/get-users',(req,res) => {
  check('CarsAreRed','powerRangers')
     .then((result) => {
         res.send(result)
         console.log(result)
     })
     .catch((err) =>{
         console.log(err)
     })
})

app.post("/", function (req, res) {
  const username =req.body.username;
  const password =req.body.password;
  const valid=check(username,password)
     .then((result) => {
        if(result == true)
        {
          res.sendFile(__dirname + '/SRC/views/home.html')
        }else{
          res.sendFile(__dirname + '/SRC/views/login.html')
        }
     })
     .catch((err) =>{
         console.log(err)
         res.sendFile(__dirname + '/SRC/views/login.html')
     })
  console.log('we are out of the loop')
});

/*
app.post("/register", function (req, res) {
  const username =req.body.username;
  const password2 =req.body.password;
  const email= req.body.email;
  console.log(username);
  console.log(password2);
  console.log(email);
  //res.sendFile(path.join(__dirname, "..", "Views", "register.html"));
});
*/
module.exports = app;

//app.listen(process.env.PORT || 3000);
console.log("Express server running on port 3000");
