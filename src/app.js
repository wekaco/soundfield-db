const mapboxgl  = require('mapbox-gl/dist/mapbox-gl.js');
const router = require('./router.js');
const Kefir = require('kefir');

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
    const coordinates = Kefir.stream(emitter => {
      map.on('click', (e) => emitter.emit(e.lngLat.toArray()));
      return () => {
        //unsubscribe
      };
    });
    coordinates.log();
    // Setup router
    const routes = router(document.querySelector('footer'), coordinates);
    routes.observe(({ id, data, type }) => {
      const source = map.getSource(id);
      if (source) {
        return source.setData(data);
      }
      map.addSource(id, { type, data });
      console.log(id);
      map.addLayer({
        'id': `layer_${id}`,
        'type': 'line',
        'source': id,
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#888',
          'line-width': 8
        }
      });
    });
  });
};


document.addEventListener('DOMContentLoaded', init, false);
