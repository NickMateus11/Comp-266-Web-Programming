
import { productList } from './productData.js'


const UTC_time = new Date();

// ((UTC_time in ms -> minutes) - timezoneOffset in minutes) -> days in current timezone
const currentDay = Math.floor((UTC_time.getTime() / (1000 * 60) - UTC_time.getTimezoneOffset()) / (60 * 24));
export const PoD = productList[currentDay % productList.length];

const PoD_title = document.createElement('h3');
PoD_title.innerHTML = "Product of the Day:";

const PoD_img = document.createElement('img');
PoD_img.alt = PoD.alt;
PoD_img.width = PoD.width;
PoD_img.height = PoD.height;
PoD_img.src = PoD.img;

const PoD_link = document.createElement('a');
PoD_link.target = "_blank";
PoD_link.href = PoD.href;
PoD_link.innerHTML = PoD.name + " <br> " + PoD.price;

const PoD_element = document.getElementsByClassName("PoD")[0];
PoD_element.innerHTML = PoD_title.outerHTML + PoD_img.outerHTML + "<div>" + PoD_link.outerHTML + "</div>";
