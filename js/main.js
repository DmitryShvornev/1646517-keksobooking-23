import {ads, renderOffer} from './popup.js';
import {setInactive, setActive} from './form.js';

setInactive();

const address = document.querySelector('#address');
const DEFAULT_COORDS = {
  lat: 35.6895000,
  lng: 139.6917100,
};
const DEFAULT_ZOOM = 13;
const MAP_TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_TILE_LAYER_ATTRIBUTE  = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

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

mainMarker.addTo(map);
address.readOnly = true;
address.value = `${mainMarker.getLatLng().lat}, ${mainMarker.getLatLng().lng}`;

mainMarker.on('moveend', () => {
  address.value = `${mainMarker.getLatLng().lat.toFixed(5)}, ${mainMarker.getLatLng().lng.toFixed(5)}`;
});


ads.forEach((ad) => {
  createMarker(ad);
});
