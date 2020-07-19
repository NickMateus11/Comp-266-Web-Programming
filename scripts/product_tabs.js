
const shoesTab = document.getElementById("shoes");
const shortsTab = document.getElementById("shorts");
const shirtsTab = document.getElementById("shirts");
const accessoriesTab = document.getElementById("accessories");
const product_iframe = document.getElementsByName("product_iframe")[0];

const category = new URLSearchParams(location.search).get("category");

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

// ********** experiemental code **********
// product_iframe.onload = function () {
//     console.log(product_iframe.style.height)
//     product_iframe.style.height = product_iframe.contentWindow.document.body.scrollHeight + 50 + 'px';
// }
$( window ).on( "load", () => { 
    product_iframe.style.height = product_iframe.contentWindow.document.body.scrollHeight + 50 + 'px'; 
});

// ** USE THIS INSTEAD? **
// window.addEventListener('load', function () {
//   alert('Hello!')
// })

