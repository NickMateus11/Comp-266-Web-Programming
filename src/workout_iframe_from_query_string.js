
function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    const results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const workout = getParameterByName("workout");
const workout_iframe = document.getElementsByName("workout_iframe")[0];

switch (workout) {
    case "recovery":
        workout_iframe.src = "./workouts/recovery.html";
        break;
    case "speed":
        workout_iframe.src = "./workouts/speed.html";
        break;
    case "cardio":
        workout_iframe.src = "./workouts/cardio.html";
        break;
    case "interval":
        workout_iframe.src = "./workouts/interval.html";
        break;
    case "weightloss":
        workout_iframe.src = "./workouts/weight_loss.html";
        break;
    default:
        workout_iframe.src = "./workouts/recovery.html";
}
