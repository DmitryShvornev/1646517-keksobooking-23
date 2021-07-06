import {sendData} from'./api.js';
import {renderOffer} from './popup.js';
import {adForm, successMessageTemplate, errorMessageTemplate} from './form.js';

const address = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

const DEFAULT_COORDS = {
  lat: 35.6895000,
  lng: 139.6917100,
};
const DEFAULT_ZOOM = 13;
const MAP_TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_TILE_LAYER_ATTRIBUTE  = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const MARKER_COUNT = 10;


const map = L.map('map-canvas');

L.tileLayer(
  MAP_TILE_LAYER,
  {
    attribution: MAP_TILE_LAYER_ATTRIBUTE,
  },
).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  DEFAULT_COORDS,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.on('moveend', () => {
  address.value = `${mainMarker.getLatLng().lat.toFixed(5)}, ${mainMarker.getLatLng().lng.toFixed(5)}`;
});

const createMarker = (ad) => {
  const {location, offer, author} = ad;
  const marker = L.marker({
    lat: location.lat,
    lng: location.lng,
  },
  {
    icon: pinIcon,
  },
  );

  marker.addTo(markerGroup).bindPopup(renderOffer({offer, author}));
};

const resetPage = () => {
  adForm.reset();
  mainMarker.setLatLng(DEFAULT_COORDS);
  address.readOnly = true;
  address.value = `${DEFAULT_COORDS.lat}, ${DEFAULT_COORDS.lng}`;
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(() => {
    const successMessageElement = successMessageTemplate.cloneNode(true);
    document.body.append(successMessageElement);
    resetPage();
  },
  () => {
    const errorMessageElement = errorMessageTemplate.cloneNode(true);
    document.body.append(errorMessageElement);}, formData);
});

resetButton.addEventListener('click', () => {
  resetPage();
});

const initPins = (ads) => {
  ads.slice(0, MARKER_COUNT).forEach((ad) => {
    createMarker(ad);
  });
};

const initMapEventLoader = (onLoadHandler) => {
  mainMarker.addTo(map);
  address.readOnly = true;
  address.defaultValue = `${DEFAULT_COORDS.lat}, ${DEFAULT_COORDS.lng}`;
  map.on('load', onLoadHandler).setView(DEFAULT_COORDS, DEFAULT_ZOOM);
};

export {initPins, initMapEventLoader};
