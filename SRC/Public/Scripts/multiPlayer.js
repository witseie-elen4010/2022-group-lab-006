const button = document.getElementById("idButton");

let game_id;
let gameMode;
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

    // console.log(game_id);
  },
  false
);
