import { MAPBOX_API_KEY } from './api_keys.js';
mapboxgl.accessToken = MAPBOX_API_KEY;

// Resource from: https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/
export function createMap(targetID, centerCoords, markers, zoom) {

    var map = new mapboxgl.Map({
        container: targetID,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: centerCoords,
        zoom: zoom || 11,
        minZoom: Math.min(8, zoom-1),
        maxZoom: 14,
    });
    
    map.on('load', function () {
        map.loadImage(
            'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
            // Add an image to use as a custom marker
            function (error, image) {
                if (error) throw error;
                map.addImage('custom-marker', image);
    
                const refinedMarkers = [];
                markers.forEach(marker => {
                    refinedMarkers.push( {
                        'type': 'Feature',
                        'properties': { 'description': marker.popUp_desc },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': marker.coords
                        }
                    });
                });
                map.addSource('places', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': refinedMarkers
                    }
                });
    
                // Add a layer showing the places.
                map.addLayer({
                    'id': 'places',
                    'type': 'symbol',
                    'source': 'places',
                    'layout': {
                        'icon-image': 'custom-marker',
                        'icon-allow-overlap': true
                    }
                });
            }
        );
    
        // Create a popup, but don't add it to the map yet.
        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });
    
        map.on('mouseenter', 'places', function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
    
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.description;
    
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
    
            // Populate the popup and set its coordinates
            // based on the feature found.
            popup
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
        });
    
        map.on('mouseleave', 'places', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    });
}
