
import { getParameterByName } from './query_strings.js'

const shoesTab = document.getElementById("shoes");
const shortsTab = document.getElementById("shorts");
const shirtsTab = document.getElementById("shirts");
const accessoriesTab = document.getElementById("accessories");
const product_iframe = document.getElementsByName("product_iframe")[0];

const category = getParameterByName("category");
switch (category) {
    case "shoes":
        shoesTab.style = 'background-color: grey; color: black';
        product_iframe.src = "./product_categories/shoes.html";
        break;
    case "shorts":
        shortsTab.style = 'background-color: grey; color: black';
        product_iframe.src = "./product_categories/shorts.html";
        break;
    case "shirts":
        shirtsTab.style = 'background-color: grey; color: black';
        product_iframe.src = "./product_categories/shirts.html";
        break;
    case "accessories":
        accessoriesTab.style = 'background-color: grey; color: black';
        product_iframe.src = "./product_categories/suppliments.html";
        break;
    default:
        shoesTab.style = 'background-color: grey; color: black';
        product_iframe.src = "./product_categories/shoes.html";
}