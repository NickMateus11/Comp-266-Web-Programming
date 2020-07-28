

const workout_tab = document.getElementById("workout_tab");
const records_tab = document.getElementById("records_tab");
const trails_tab = document.getElementById("trails_tab");
const product_tab = document.getElementById("product_tab");

$('#workout_dropdown').hide();
$('#product_dropdown').hide();

const regex = new RegExp('([a-zA-z]+)\.html.*');
let currentPage = regex.exec(window.location.href);
if (currentPage) {
    currentPage = currentPage[1];
}

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

$("#workout_tab_drop").hover(
    function () { 
        setTimeout( () => {
            if ($('#workout_tab_drop').is(':hover')) $('#workout_dropdown').slideDown('medium'); 
        }, 250)},
    function () { $('#workout_dropdown').slideUp('fast'); }
);

$("#product_tab_drop").hover(
    function () { 
        setTimeout( () => {
            if ($('#product_tab_drop').is(':hover')) $('#product_dropdown').slideDown('medium'); 
        }, 250)},
    function () { $('#product_dropdown').slideUp('fast'); }
);
