
import { productList } from './productData.js'
import { setCurrency } from './currency_converter.js'

function search() {
    const search_element = document.getElementById('product_search_input');
    const search_words = search_element.value.split(' ');
    const product_iframe = document.getElementsByName("product_iframe")[0].contentWindow.document;
    const iframe_product_table = product_iframe.getElementsByTagName('table')[0]

    //return if search empty
    if (!search_words[0]) return;

    //show 'clear search' button
    document.getElementById('clear_search').style = 'display:inline';

    let matches = [];
    search_words.forEach( word => {
        productList.forEach( product => {
            if (product.name.toLowerCase().includes(word.toLowerCase()) || 
                product.alt.includes(word.toLowerCase()) || 
                word.toLowerCase().includes(product.alt)) 
            {
                matches.push(product);
            }
        });
    });

    //wipe iframe product table content
    iframe_product_table.innerHTML = '';

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

    setCurrency(); // default: set currency to whatever the radio button is
}

document.getElementById("product_search_input").onkeydown = ()=>{if(event.key==='Enter') search()};
document.getElementById("search_button").onclick = search;