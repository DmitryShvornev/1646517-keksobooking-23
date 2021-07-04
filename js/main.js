import {getData, sendData, showAlert} from'./api.js';
import {renderOffer} from './popup.js';
import {setInactive, setActive, adForm, successMessageTemplate, errorMessageTemplate} from './form.js';

const address = document.querySelector('#address');
const reset = document.querySelector('.ad-form__reset');

const DEFAULT_COORDS = {
  lat: 35.6895000,
  lng: 139.6917100,
};
const DEFAULT_ZOOM = 13;
const MAP_TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_TILE_LAYER_ATTRIBUTE  = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

setInactive();

const map = L.map('map-canvas')
  .on('load', () => {
    setActive();
  })
  .setView(DEFAULT_COORDS, DEFAULT_ZOOM);

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
    lat: Number(location.lat),
    lng: Number(location.lng),
  },
  {
    icon: pinIcon,
  },
  );

  marker.addTo(markerGroup).bindPopup(renderOffer({offer, author}));
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(() => {
    const successMessageElement = successMessageTemplate.cloneNode(true);
    document.body.append(successMessageElement);
    adForm.reset();
    mainMarker.setLatLng(DEFAULT_COORDS);
    address.value = `${mainMarker.getLatLng().lat}, ${mainMarker.getLatLng().lng}`;
  },
  () => {
    const errorMessageElement = errorMessageTemplate.cloneNode(true);
    document.body.append(errorMessageElement);}, formData);
});

reset.addEventListener('click', () => {
  adForm.reset();
  mainMarker.setLatLng(DEFAULT_COORDS);
  address.value = `${mainMarker.getLatLng().lat}, ${mainMarker.getLatLng().lng}`;
});


mainMarker.addTo(map);
address.readOnly = true;
address.value = `${mainMarker.getLatLng().lat}, ${mainMarker.getLatLng().lng}`;
getData((ads) => {
  ads.forEach((ad) => {
    createMarker(ad);
  });
}, showAlert);
