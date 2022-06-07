let game_id;
let gameMode;
const sock = io();
const gameBoard1 = document.querySelector(".gameBoard1");
const button = document.getElementById("idButton");

//EVENT LISTENERS
button?.addEventListener("click", joinGame, false);

function createBoard2() {
  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfColumns; j++) {
      const block = document.createElement("span");
      block.id = i.toString() + "-" + j.toString();
      block.classList.add("block");
      gameBoard1.append(block);
    }
  }
}

function joinGame() {
  game_id = window.prompt("Please Enter Game ID");

  if (game_id === "") {
    alert("Game ID can't be empty");
    return;
  }
  gameMode = window.prompt("Please Enter Game Mode");
  if (gameMode === "") {
    alert("Game Mode can't be empty");
    return;
  }

  function replace() {
    location.replace("/lobby");
  }

  let mode = localStorage.getItem("gameMode");
  let id = localStorage.getItem("id");

  if (id === game_id && gameMode == mode && gameMode == 1) {
    console.log("Hi, Mode 1 here");
    alert("Correct!");

    //sock.emit("opponentJoin", joiningDetails);
    replace();
  } else if (id === game_id && gameMode == mode && gameMode == 2) {
    console.log("Hi, Mode 2 here");
    alert("Correct!");
    location.replace("/Lobby");
    alert("Welcome");
  } else if (id != game_id && gameMode != mode && gameMode != 2) {
    alert(
      "Game ID and or Game Mode does not exist, Please ask the Host to share it with you"
    );
  } else {
    return;
  }
}
/*
const writeEvent = (text) => {
  const parent = document.querySelector("#events");

  const el = document.createElement("li");
  el.innerHTML = text;

  parent.appendChild(el);
};

const onFormSubmitted = (e) => {
  e.preventDefault();
  const text = "Hi there dawg";
  sock.emit("addBoard", text);
};

//SOCKET LISTENERS

//sock.on("addBoard", writeEvent);
//sock.on("gameHosted", displayDetails);
/*
function displayDetails(details) {
  console.log(details, "From Server multi");
}

document
  .querySelector("#chat-form")
  .addEventListener("submit", onFormSubmitted);
*/
