const PHOTO_WIDTH = 45;
const PHOTO_HEIGHT = 40;
const adTemplate = document.querySelector('#card').content.querySelector('.popup');

const housingTypes = {
  'flat':'Квартира',
  'bungalow':'Бунгало',
  'house':'Дом',
  'palace':'Дворец',
  'hotel':'Отель',
};

const setTextContent = (element, value) => {
  if (value) {
    element.textContent = value;
    return;
  }
  element.remove();
};


const renderOffer = ({offer, author}) => {
  const adElement = adTemplate.cloneNode(true);
  setTextContent(adElement.querySelector('.popup__title'), offer.title);
  setTextContent(adElement.querySelector('.popup__text--address'), offer.address);
  if (offer.price) {
    adElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  } else {
    adElement.querySelector('.popup__text--price').remove();
  }
  setTextContent(adElement.querySelector('.popup__type'), housingTypes[offer.type]);
  if (offer.rooms && offer.guests) {
    adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    adElement.querySelector('.popup__text--capacity').remove();
  }
  if (offer.checkin && offer.checkout) {
    adElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    adElement.querySelector('.popup__text--time').remove();
  }
  if (offer.features){
    const featureListElement = adElement.querySelector('.popup__features');
    const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);
    featureListElement.querySelectorAll('.popup__feature').forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  } else {
    adElement.querySelector('.popup__features').remove();
  }
  setTextContent(adElement.querySelector('.popup__description'), offer.description);
  adElement.querySelector('.popup__photo').remove();
  if (offer.photos) {
    const photosListElement = adElement.querySelector('.popup__photos');
    offer.photos.forEach((element) => {
      const photo = document.createElement('img');
      photo.width = PHOTO_WIDTH;
      photo.height = PHOTO_HEIGHT;
      photo.src = element;
      photo.classList.add('popup__photo');
      photosListElement.appendChild(photo);
    });
  } else {
    adElement.querySelector('.popup__photos').remove();
  }
  if (author.avatar) {
    adElement.querySelector('.popup__avatar').src = author.avatar;
  } else {
    adElement.querySelector('.popup__avatar').remove();
  }
  return adElement;
};

export {renderOffer};
