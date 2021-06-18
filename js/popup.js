import {createAd, ADS_NUMBER} from './data.js';

const adTemplate = document.querySelector('#card').content.querySelector('.popup');
const ads = new Array(ADS_NUMBER).fill(null);
for (let number = 0; number < ads.length; number++) {
  ads[number] = createAd(number + 1);
}

const mapCanvas = document.querySelector('#map-canvas');
const adElements = [];

ads.forEach(({offer, author}) => {
  const adElement = adTemplate.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = offer.title;
  adElement.querySelector('.popup__text--address').textContent = offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  let housingType;
  switch (offer.type) {
    case 'flat':
      housingType = 'Квартира';
      break;
    case 'bungalow':
      housingType = 'Бунгало';
      break;
    case 'house':
      housingType = 'Дом';
      break;
    case 'palace':
      housingType = 'Дворец';
      break;
    case 'hotel':
      housingType = 'Отель';
      break;
    default:
      housingType = '';
  }
  adElement.querySelector('.popup__type').textContent = housingType;
  adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  const featureListElement = adElement.querySelector('.popup__features');
  const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);
  featureListElement.querySelectorAll('.popup__feature').forEach((item) => {
    const modifier = item.classList[1];
    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });
  adElement.querySelector('.popup__description').textContent = offer.description;
  adElement.querySelector('.popup__photo').remove();
  const photosListElement = adElement.querySelector('.popup__photos');
  for (let number = 0; number < offer.photos.length; number++) {
    const photo = document.createElement('img');
    photo.width = 45;
    photo.height = 40;
    photo.src = offer.photos[number];
    photo.classList.add('popup__photo');
    photosListElement.appendChild(photo);
  }
  adElement.querySelector('.popup__avatar').src = author.avatar;
  adElements.push(adElement);
});

mapCanvas.appendChild(adElements[0]);
