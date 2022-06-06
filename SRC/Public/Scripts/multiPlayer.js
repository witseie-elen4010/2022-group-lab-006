const button = document.getElementById("idButton");
let game_id;
let gameMode;

const gameBoard1 = document.querySelector(".gameBoard1");

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

button?.addEventListener(
  "click",
  function () {
    game_id = window.prompt("Please Enter Game ID");
    gameMode = window.prompt("Please Enter Game Mode");

    let mode = localStorage.getItem("gameMode");
    let id = localStorage.getItem("id");

    if (id === game_id && gameMode == mode && gameMode == 1) {
      console.log("Hi, Mode 1 here");
      location.replace("/multiPlayerMode1");
    } else if (id === game_id && gameMode == mode && gameMode == 2) {
      console.log("Hi, Mode 2 here");
      location.replace("/multiPlayerMode2");
    } else {
      alert("Incorrect Game ID and or Game Mode");
    }
  },
  false
);

const writeEvent = (text) => {
  const parent = document.querySelector("#events");

  const el = document.createElement("li");
  el.innerHTML = text;

  parent.appendChild(el);
};
writeEvent("Welcome to Wordle");

const onFormSubmitted = (e) => {
  e.preventDefault();

  const input = document.querySelector("#chat");
  const text = input.value;
  input.value = "";

  sock.emit("message", text);
};

const sock = io();
sock.on("message", writeEvent);

document
  .querySelector("#chat-form")
  .addEventListener("submit", onFormSubmitted);
