

const workout_tab = document.getElementById("workout_tab");
const records_tab = document.getElementById("records_tab");
const trails_tab = document.getElementById("trails_tab");
const product_tab = document.getElementById("product_tab");

const regex = new RegExp('([a-zA-z]+)\.html.*');
const currentPage = regex.exec(window.location.href)[1];

switch (currentPage) {
    case "workoutsPage":
        workout_tab.style = 'background-color: #ddd; color: black';
        break;
    case "recordsPage":
        records_tab.style = 'background-color: #ddd; color: black';
        break;
    case "trailsPage":
        trails_tab.style = 'background-color: #ddd; color: black';
        break;
    case "productsPage":
        product_tab.style = 'background-color: #ddd; color: black';
        break;
}
