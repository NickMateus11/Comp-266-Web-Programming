
import { createMap } from './mapBoxAPI.js';
import { TRAILS_API_KEY, MAPBOX_API_KEY as GEOCODING_API_KEY } from './api_keys.js';

const trailsAPI_url = "https://www.trailrunproject.com/data";
const trailsAPI_endpoint = "/get-trails";
// const trailsAPI_extraParams = ["maxResults=3","sort=distance"];
const trailsAPI_extraParams = ["maxResults=50"];

const geoAPI_url = "https://api.mapbox.com/geocoding/v5";
const geoAPI_endpoint = "/mapbox.places";


async function getTrails(coords) {
    const trailResults = await (await fetch(`${trailsAPI_url}${trailsAPI_endpoint}?lat=${coords['lat']}&lon=${coords['lon']}&${trailsAPI_extraParams.join('&')}&key=${TRAILS_API_KEY}`)).json();
    const allTrails = trailResults.trails;
    const numTrailsWanted = 3;

    const trails = []
    for (let i=0; i<allTrails.length && trails.length<numTrailsWanted; i++) {
        if (allTrails[i].imgSmallMed) { trails.push(allTrails[i]); }
    }
    for (let i=0; i<allTrails.length && trails.length<numTrailsWanted; i++) {
        if (!trails.includes(allTrails[i])) { trails.push(allTrails[i]); }
    }
    return trails;
}

async function getCoords(location) {
    const search_phrase = encodeURI(location);

    const coords = await (await fetch(`${geoAPI_url}${geoAPI_endpoint}/${search_phrase}.json?access_token=${GEOCODING_API_KEY}`)).json();    
    const [lon, lat] = coords.features[0].geometry.coordinates;

    return { lon, lat };
}

function populateTableWithTrails(trails) {
    const trail_table = document.querySelector('.trail_table');
    trail_table.innerHTML = '';

    if (!trails.length) {
        trail_table.innerHTML = `
        <tr>
            <td>
                <h3>NO TRAILS FOUND</h3>
            </td>
        </tr>`;
        return;
    }

    const temp = [];
    trails.forEach( trail => {
        const { id, url, name, imgSmallMed:img, location, longitude:lon, latitude:lat, summary} = trail;
        trail_table.innerHTML += `
            <tr>
                <td>
                    <a href="${url}"> <img
                        alt="NO PICTURE AVAILABLE" src="${img}"> </a>
                    <br><a href="${url}">${name} (${location})</a>
                </td>
                <td>
                    <div class="table_map" id="map_${id}"></div>
                </td>
            </tr>
        `;
        const trail_marker = [
            { coords: [lon, lat], popUp_desc: `<strong>${name}</strong><br>${summary}` },
        ];

        temp.push([`map_${id}`, [lon, lat], trail_marker]);


    });
    temp.forEach( trailInfo => { createMap(...trailInfo); })
}

async function trailSearch_onclick(event) {
    event.preventDefault();

    const searchTerm = $('#trailSearch_input').val();
    const coords = await getCoords(searchTerm);

    const trails = await getTrails(coords);
    populateTableWithTrails(trails);

    //extract trail coords
    const trail_markers = [];
    trails.forEach( trail => {
        const { name, longitude:lon, latitude:lat, summary} = trail;
        trail_markers.push(
            { coords: [lon, lat], popUp_desc: `<strong>${name}</strong><br>${summary}` },
        );
    });


    $( "#dialog" ).dialog({
        modal: true,
        draggable: false,
    });
    //create a master map with markers
    createMap('map_master', Object.values(coords), trail_markers, 7, function(){ $( "#dialog" ).dialog( "close" ); });
    $('.trail_overview').show();
}

const form = document.querySelector('#trailSearch_form');
form.onsubmit = trailSearch_onclick;
                
