import {setInactive, setActive} from './form.js';
import {getData, showAlert} from './api.js';
import {initPins, initMapEventLoader, markerGroup} from './map.js';
import {initFilterEventLoader} from './filter.js';
import {debounce} from './debounce.js';


const main = () => {
  setInactive();
  getData((data) => {
    initPins(data);
    initFilterEventLoader(debounce(() => {
      markerGroup.clearLayers();
      initPins(data);
    }));
    initMapEventLoader(setActive);
  }, showAlert);
};

main();
