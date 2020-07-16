
import { productList } from './productData.js'
import { getParameterByName } from './query_strings.js'
import { PoD } from './PoD.js'


function currencyChange() {
    const currentValue = document.querySelector('input[name="currency_radio"]:checked').value
    // console.log(lastValue, currentValue)

    if (lastValue !== currentValue) {
        // console.log("Changed");
        setCurrencyCookie(currentValue);
        setCurrency(currentValue);
        lastValue = currentValue;
    }
}

export function setCurrency(currency) {
    if (!currency) {
        currency = document.querySelector('input[name="currency_radio"]:checked').value;
    }

    const oldCurrency = currency==='CAD'? 'USD': 'CAD';

    // Product of the Day
    const PoD_element = document.getElementsByClassName('PoD')[0];
    let PoD_price;
    if (PoD.price.includes(currency))
        PoD_price = PoD.price;
    else
        PoD_price = currency + ' $' + (Number(PoD.price.split('$')[1]) * ((currency === 'CAD')*1.3 + (currency === 'USD')*0.77)).toFixed(2);

    PoD_element.innerHTML = PoD_element.innerHTML.replace(
        new RegExp(oldCurrency + ' \\$[0-9\\.]+'), 
        PoD_price
    );
    
    // Products in iframe
    const product_iframe = document.getElementsByName("product_iframe")[0].contentWindow.document;
    const iframe_product_table = product_iframe.getElementsByTagName('table')[0]
    productList.forEach(product => {
        if (product.alt == getParameterByName("category")){
            let newPrice;
            if (product.price.includes(currency)) 
                newPrice = product.price;
            else 
                newPrice = currency + ' $' + (Number(product.price.split('$')[1]) * ((currency === 'CAD')*1.3 + (currency === 'USD')*0.77)).toFixed(2);

            iframe_product_table.innerHTML = iframe_product_table.innerHTML.replace(
                new RegExp(`${product.name}[ (<br>)]+ ${oldCurrency} [ \\$0-9\\.]+`), 
                `${product.name} <br> ${newPrice}`
            );

        }
    });    
}

function readCurrencyCookie() {
    // read cookies and update radio button with whatever the last state was
    const cname = 'currency';

    // code from: https://www.w3schools.com/js/js_cookies.asp
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function setCurrencyCookie(currency) {
    // set cookies to hold the state of the radio button
    document.cookie = `currency=${currency}`;
}

const currency = readCurrencyCookie();
document.getElementsByName('currency_radio').forEach( radio => {
    if (radio.value === currency) radio.checked = true;
});

let lastValue = document.querySelector('input[name="currency_radio"]:checked').value;
document.getElementsByName("product_iframe")[0].onload = function() { setCurrency(lastValue); };

const currencyRadios = document.getElementsByName('currency_radio');
currencyRadios.forEach(radio => {
    radio.onchange = currencyChange;
});