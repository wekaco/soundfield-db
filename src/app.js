const mapbox  = require('mapbox-gl/dist/mapbox-gl.js');

const init = () => {
  mapbox.accessToken =  '__MAPBOX_API_KEY__';
  const map = new mapbox.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10'
  });

  //Mojave
  const darkmode = window.matchMedia('(prefers-color-scheme: dark)');
  if(darkmode.matches) {
    map.setStyle('mapbox://styles/mapbox/dark-v10');
    darkmode.addEventListener('change', (e) => alert(JSON.stringify(e)));
  }
};


document.addEventListener('DOMContentLoaded', init, false);
