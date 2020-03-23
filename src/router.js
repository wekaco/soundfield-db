import { v4 as uuidv4 } from 'uuid';
import Kefir from 'kefir';

const data = (coordinates) => ({
  'type': 'Feature',
  'properties': {},
  'geometry': {
    'type': 'LineString',
    'coordinates': coordinates
  }
});

export default (root, stream) => {
  const routes = new Map();

  const form = root.querySelector('form');
  const id = form.querySelector('input[name="id"]');

  const create = root.querySelector('#create');
  create.addEventListener('click', (e) => {
    id.value = uuidv4();
  });
  create.click();

  const undo = root.querySelector('#undo');
  //const color = form.querySelector('input[name="color"]');
  //const nuBtn = root.querySelector('#new');
  //const undoBtn = root.querySelector('#undo');
  //console.log(form, nuBtn, undoBtn, id);

  return Kefir.stream( emitter => {
    undo.addEventListener('click', (e) => {
      routes.get(id.value).data.geometry.coordinates.pop();
      emitter.emit(routes.get(id.value));
    });

    stream.observe( item => {
      if (!routes.has(id.value)) {
        routes.set(id.value, { 'id': id.value, 'type': 'geojson', 'data': data([]) });
      }
      routes.get(id.value).data.geometry.coordinates.push(item);
      emitter.emit(routes.get(id.value));
    });
    return () => {
      // unsbuscribe
    };
  });
};
