const shoesTab = document.getElementById("shoes");
const shortsTab = document.getElementById("shorts");
const shirtsTab = document.getElementById("shirts");
const accessoriesTab = document.getElementById("accessories");

const iframe_source_regex = new RegExp("\.\/product_categories\/(.*)\.html");

const regexResult = iframe_source_regex.exec(product_iframe.src);
let iframe_content;
if (regexResult) {
    iframe_content = regexResult[1];
} else {
    iframe_content = '';
}

switch (iframe_content) {
    case "shoes":
        shoesTab.style = 'background-color: grey; color: black';
        break;
    case "shorts":
        shortsTab.style = 'background-color: grey; color: black';
        break;
    case "shirts":
        shirtsTab.style = 'background-color: grey; color: black';
        break;
    case "suppliments":
        accessoriesTab.style = 'background-color: grey; color: black';
        break;
}