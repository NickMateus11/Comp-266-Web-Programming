
import { getParameterByName } from './query_strings.js'

const recoveryTab = document.getElementById("recovery");
const speedTab = document.getElementById("speed");
const cardioTab = document.getElementById("cardio");
const intervalTab = document.getElementById("interval");
const weightlossTab = document.getElementById("weightloss");
const workout_iframe = document.getElementsByName("workout_iframe")[0];

const workout = getParameterByName("workout");
switch (workout) {
    case "recovery":
        recoveryTab.style = 'background-color: grey; color: black';
        workout_iframe.src = "./workouts/recovery.html";
        break;
    case "speed":
        speedTab.style = 'background-color: grey; color: black';
        workout_iframe.src = "./workouts/speed.html";
        break;
    case "cardio":
        cardioTab.style = 'background-color: grey; color: black';
        workout_iframe.src = "./workouts/cardio.html";
        break;
    case "interval":
        intervalTab.style = 'background-color: grey; color: black';
        workout_iframe.src = "./workouts/interval.html";
        break;
    case "weightloss":
        weightlossTab.style = 'background-color: grey; color: black';
        workout_iframe.src = "./workouts/weight_loss.html";
        break;
    default:
        recoveryTab.style = 'background-color: grey; color: black';
        workout_iframe.src = "./workouts/recovery.html";
}