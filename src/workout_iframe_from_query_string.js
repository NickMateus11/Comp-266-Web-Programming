
function getParameterByName(name) {
    const regex = new RegExp(name + '=(\\w+)'); // Will extract the value from ex: 'name=Value'
    const results = regex.exec(window.location.search);
    if (!results) return null; // Regex failed to match anything
    if (!results[1]) return ''; // The name of the parameter did not exist
    return decodeURIComponent(results[1].replace(/\+/g, ' ')); // Replace '+' with ' '
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
