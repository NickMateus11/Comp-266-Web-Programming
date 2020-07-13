
import { productList } from './productData.js'
import { getParameterByName } from './query_strings.js'

const currencyRadios = document.getElementsByName('currency_radio');
currencyRadios.forEach(radio => {
    radio.onchange = currencyChange;
});

function setCurrencyTo(currency) {

    productList.forEach(product => {
        if (product.alt == getParameterByName("category") && !product.price.includes(currency)){
            // console.log(product);
            // ** account for changing back to default case **
            const newPrice = (Number(product.price.split('$')[1]) * ((currency === 'CAD')*1.3 + (currency === 'USD')*0.77)).toFixed(2);
            console.log("Price: " + product.price + ", Should be: " +  currency + " " + newPrice);
        }
    });    
}

function readCookies() {
    // read cookies and update radio button with whatever the last state was
}

readCookies();

let lastValue = document.querySelector('input[name="currency_radio"]:checked').value;
function currencyChange() {
    const currentValue = document.querySelector('input[name="currency_radio"]:checked').value
    console.log(lastValue, currentValue)

    if (lastValue !== currentValue) {
        console.log("Changed");
        setCurrencyTo(currentValue);
    }

    lastValue = currentValue;
}