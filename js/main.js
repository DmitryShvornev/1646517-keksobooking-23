import {setInactive, setActive} from './form.js';
import {getData, showAlert} from './api.js';
import {initPins, initMapEventLoader} from './map.js';

const main = () => {
  setInactive();
  getData((data) => {
    initPins(data);
    initMapEventLoader(setActive);
  }, showAlert);
};

main();
