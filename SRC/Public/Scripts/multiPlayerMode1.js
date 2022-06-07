const get = document.getElementById("Get");
const details_ = document.getElementById("events");

get?.addEventListener("click", getProperties, false);

function getProperties() {
  let id = localStorage.getItem("id");
  let join_id = localStorage.getItem("game_id");
  let mode = localStorage.getItem("gameMode");

  console.log(join_id);
  console.log(id);
  console.log(mode);

  document.getElementById("gameMode").textContent = mode;
  document.getElementById("gameID").textContent = id;
}
