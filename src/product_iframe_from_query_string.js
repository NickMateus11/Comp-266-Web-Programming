
function getParameterByName(name) {
    const regex = new RegExp(name + '=(\\w+)'); // Will extract the value from ex: 'name=Value'
    const results = regex.exec(window.location.search);
    if (!results) return null; // Regex failed to match anything
    if (!results[1]) return ''; // The name of the parameter did not exist
    return decodeURIComponent(results[1].replace(/\+/g, ' ')); // Replace '+' with ' '
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
