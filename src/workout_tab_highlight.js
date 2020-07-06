const recoveryTab = document.getElementById("recovery");
const speedTab = document.getElementById("speed");
const cardioTab = document.getElementById("cardio");
const intervalTab = document.getElementById("interval");
const weightlossTab = document.getElementById("weightloss");

const iframe_source_regex = new RegExp("\.\/workouts\/(.*)\.html");
const regexResult = iframe_source_regex.exec(workout_iframe.src);
let iframe_content;
if (regexResult) {
    iframe_content = regexResult[1];
} else {
    iframe_content = '';
}

switch (iframe_content) {
    case "recovery":
        recoveryTab.style = 'background-color: grey; color: black';
        break;
    case "speed":
        speedTab.style = 'background-color: grey; color: black';
        break;
    case "cardio":
        cardioTab.style = 'background-color: grey; color: black';
        break;
    case "interval":
        intervalTab.style = 'background-color: grey; color: black';
        break;
    case "weight_loss":
        weightlossTab.style = 'background-color: grey; color: black';
        break;
}