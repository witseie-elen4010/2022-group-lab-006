'use strict'

let startTime;
let endTime;
const timeH = document.querySelector('h2');
let time_seconds = 30;
const count_down = setInterval(() => {
    time_seconds--;
    displayTime(time_seconds);

    if (time_seconds == 0 || timeElapse < 1) {
        endCount()
        clearInterval(count_down);
    }
}, 1000)


//function for starting the time
function start() {
    startTime = new Date();
}


//function when time ends
function end() {
    endTime = new Date();

    let timeElapse = endTime - startTime; //in ms
    timeElapse /= 1000;
    let timeElapse_seconds = Math.round(timeElapse);
    alert("It took you" + timeElapse_seconds + "to finish the game")
}

//display time
function displayTime(time_seconds) {
    const min = Math.floor(time_seconds / 60);
    const sec = Math.floor(time_seconds % 60);
    timeH.innerHTML = `${min < 10 ? "0" : ""} ${min}:${sec < 10 ? "0" : ""} ${sec} `;
}

function endCount() {
    timeH.innerHTML = "Time out";
}

//creating time

