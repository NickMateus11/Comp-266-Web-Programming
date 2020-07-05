
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const category = getParameterByName("category");
const product_iframe = document.getElementsByName("product_iframe")[0];

switch (category) {
    case "shoes":
        product_iframe.src = "./product_categories/shoes.html";
        break;
    case "shorts":
        product_iframe.src = "./product_categories/shorts.html";
        break;
    case "shirts":
        product_iframe.src = "./product_categories/shirts.html";
        break;
    case "accessories":
        product_iframe.src = "./product_categories/suppliments.html";
        break;
    default:
        product_iframe.src = "./product_categories/shoes.html";
}
