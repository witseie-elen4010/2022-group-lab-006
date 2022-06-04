const button = document.getElementById("idButton");

let game_id;
button?.addEventListener(
  "click",
  function () {
    game_id = window.prompt("Please Enter Game ID");
    //  localStorage.setItem("game_id", game_id);
    let id = localStorage.getItem("id");
    if (id === game_id) {
      console.log("Hi");
      location.replace("/multiPlayerMode2");
    }

    // console.log(game_id);
  },
  false
);
