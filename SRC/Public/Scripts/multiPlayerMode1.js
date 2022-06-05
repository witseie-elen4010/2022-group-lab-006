const get = document.getElementById("Get");

get?.addEventListener(
  "click",
  function () {
    let id = localStorage.getItem("id");
    let players_ = localStorage.getItem("players_");
    let join_id = localStorage.getItem("game_id");
    let mode = localStorage.getItem("gameMode");

    // console.log(second);
    console.log(join_id);
    console.log(id);
    console.log(mode);
    console.log(players_);

    document.getElementById("gameMode").textContent = mode;
    document.getElementById("gameID").textContent = id;
    document.getElementById("PlayerNo").textContent = players_;
  },
  false
);
