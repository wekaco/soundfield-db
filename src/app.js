const mapboxgl  = require('mapbox-gl/dist/mapbox-gl.js');

const init = () => {
  // Setup map
  mapboxgl.accessToken =  '__MAPBOX_API_KEY__';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [ 23.7187359, 37.9770618],
    zoom: 14
  });
  // disable map zoom when using scroll
  //map.scrollZoom.disable();

  // Dark mode
  const darkmode = window.matchMedia('(prefers-color-scheme: dark)');
  if(darkmode.matches) {
    map.setStyle('mapbox://styles/mapbox/dark-v10');
    darkmode.addEventListener('change', (e) => alert(JSON.stringify(e)));
  }

  const coordinates = [];
  map.on('load', () => {
    const data = (coordinates) => ({
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': coordinates
      }
    });
    map.addSource('route', { 'type': 'geojson', 'data': data(coordinates) });
    
    map.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#888',
        'line-width': 8
      }
    });

    map.on('click', function(e) {
      coordinates.push(e.lngLat.toArray());
      map.getSource('route').setData(data(coordinates));
    });
  });
};


document.addEventListener('DOMContentLoaded', init, false);
