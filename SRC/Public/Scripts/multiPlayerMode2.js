const get = document.getElementById("Get");

get?.addEventListener(
  "click",
  function () {
    let id = localStorage.getItem("id");
    let mode = localStorage.getItem("mode");
    let players_ = localStorage.getItem("players_");

    // console.log(second);
    console.log(id);
    console.log(mode);
    console.log(players_);

    document.getElementById("gameMode").textContent = mode;
    document.getElementById("gameID").textContent = id;
    document.getElementById("PlayerNo").textContent = players_;

    //second = JSON.parse(second);
  },
  false
);
