
import { productList } from './productData.js'
import { setCurrency } from './currency_converter.js'

function search() {
    const search_element = document.getElementById('product_search_input');
    const search_words = search_element.value.toLowerCase().split(' ');
    const product_iframe = document.getElementsByName("product_iframe")[0];
    const iframe_product_table = product_iframe.contentWindow.document.getElementsByTagName('table')[0]

    // hide autocomplete
    $('.ui-autocomplete').hide()

    //return if search empty
    if (!search_words[0]) return;

    //show 'clear search' button
    document.getElementById('clear_search').style = 'display:inline';


    // ***** TODO: have priority system, ie: products that are closer to the WHOLE search are prioritized
    let matches = new Set();
    search_words.forEach( word => {
        productList.forEach( product => {
            if (product.name.toLowerCase().includes(word) || word.includes(product.name.toLowerCase())) {
                matches.add(product);
            }
        });
    });

    // convert matches to array and sort by closeness to search
    matches = [...matches];
    matches.sort( (a, b) => {
        const matches_a = a.name.toLowerCase().split(' ').filter(product_word => search_words.some(search_word => search_word.includes(product_word))).length
                            + search_words.filter(search_word => a.name.toLowerCase().split(' ').some(product_word => product_word.includes(search_word))).length;

        const matches_b = b.name.toLowerCase().split(' ').filter(product_word => search_words.some(search_word => search_word.includes(product_word))).length
                            + search_words.filter(search_word => b.name.toLowerCase().split(' ').some(product_word => product_word.includes(search_word))).length;

        return matches_b - matches_a ;
    });

    //wipe iframe product table content
    iframe_product_table.innerHTML = '';

    // Set iframe title
    product_iframe.contentWindow.document.querySelector('.products_title_main h2').innerHTML = "Search Results:";

    let table_innerHTML = ''
    for (let i=0; i<matches.length; i++) {
        const product = matches[i];
        if (!(i%3) && i%2) table_innerHTML += '</tr>';
        if (!(i%3) && !(i%2)) table_innerHTML += '<tr>';

        table_innerHTML += 
        `<td>
            <img alt="${product.alt}" width="${product.width}" height="${product.height}" src="${product.img}">
            <div>
                <a target="_blank" href="${product.href}">${product.name} <br> ${product.price}</a>
            </div>
        </td>`
    }
    iframe_product_table.innerHTML = table_innerHTML;

    // ********** experiemental code **********
    product_iframe.style.height = product_iframe.contentWindow.document.body.scrollHeight + 50 + 'px';

    setCurrency(); // default: set currency to whatever the radio button is
}


document.getElementById("product_search_input").onkeydown = ()=>{if(event.key==='Enter') search()};
document.getElementById("search_button").onclick = search;

// *** AUTOCOMPLETE ***
const  availableTags = productList.map(({ name }) => name);
$( "#product_search_input" ).autocomplete({
    source: availableTags
});
