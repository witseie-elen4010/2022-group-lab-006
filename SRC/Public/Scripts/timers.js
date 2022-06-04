
let startTime; 
let endTime;


//function for starting the time

function start()
{
    startTime = new Date();
}

//function when time ends

function end()
{
    endTime = new Date();

    let timeElapse = endTime - startTime; //in ms
    timeElapse /= 1000;
    let timeElapse_seconds = Math.round(timeElapse);
    alert("It took you" + timeElapse_seconds + "to finish the game")
}