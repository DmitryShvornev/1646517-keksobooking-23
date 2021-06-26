import {ads, renderOffer} from './popup.js';
import {setInactive, setActive} from './form.js';

setInactive();

const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    setActive();
  })
  .setView({
    lat: 35.6895000,
    lng: 139.6917100,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../leaflet/images/marker-icon-2x.png',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: '../leaflet/images/marker-icon.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: 35.68950,
    lng: 139.69171,
  },
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
