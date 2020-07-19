
const recoveryTab = document.getElementById("recovery");
const speedTab = document.getElementById("speed");
const cardioTab = document.getElementById("cardio");
const intervalTab = document.getElementById("interval");
const weightlossTab = document.getElementById("weightloss");
const workout_iframe = document.getElementsByName("workout_iframe")[0];

const workout = new URLSearchParams(location.search).get("workout");

switch (workout) {
    case "recovery":
        recoveryTab.style = 'background-color: grey; color: black';
        $("#workout_frame").load("./workouts/recovery.html"); 
        break;
    case "speed":
        speedTab.style = 'background-color: grey; color: black';
        $("#workout_frame").load("./workouts/speed.html"); 
        break;
    case "cardio":
        cardioTab.style = 'background-color: grey; color: black';
        $("#workout_frame").load("./workouts/cardio.html"); 
        break;
    case "interval":
        intervalTab.style = 'background-color: grey; color: black';
        $("#workout_frame").load("./workouts/interval.html"); 
        break;
    case "weightloss":
        weightlossTab.style = 'background-color: grey; color: black';
        $("#workout_frame").load("./workouts/weight_loss.html"); 
        break;
    default:
        recoveryTab.style = 'background-color: grey; color: black';
        $("#workout_frame").load("./workouts/recovery.html"); 
}