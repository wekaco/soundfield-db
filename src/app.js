const mapbox  = require('mapbox-gl/dist/mapbox-gl.js');
console.log(mapbox);

const init = () => {
  mapbox.accessToken = '';
  const map = new mapbox.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
  });
};
document.addEventListener('DOMContentLoaded', init, false);
