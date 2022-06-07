const get = document.getElementById("Get");

get?.addEventListener(
  "click",
  function () {
    let id = localStorage.getItem("id");
    let join_id = localStorage.getItem("game_id");
    let mode = localStorage.getItem("gameMode");

    // console.log(second);
    console.log(join_id);
    console.log(id);
    console.log(mode);

    document.getElementById("gameMode").textContent = mode;
    document.getElementById("gameID").textContent = id;
  },
  false
);
