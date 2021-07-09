const adTemplate = document.querySelector('#card').content.querySelector('.popup');

const housingTypes = {
  'flat':'Квартира',
  'bungalow':'Бунгало',
  'house':'Дом',
  'palace':'Дворец',
  'hotel':'Отель',
};


const renderOffer = ({offer, author}) => {
  const adElement = adTemplate.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = offer.title;
  adElement.querySelector('.popup__text--address').textContent = offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = housingTypes[offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  if (offer.features){
    const featureListElement = adElement.querySelector('.popup__features');
    const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);
    featureListElement.querySelectorAll('.popup__feature').forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  }
  adElement.querySelector('.popup__description').textContent = offer.description;
  adElement.querySelector('.popup__photo').remove();
  if (offer.photos) {
    const photosListElement = adElement.querySelector('.popup__photos');
    offer.photos.forEach((element) => {
      const photo = document.createElement('img');
      photo.width = 45;
      photo.height = 40;
      photo.src = element;
      photo.classList.add('popup__photo');
      photosListElement.appendChild(photo);
    });
  }
  adElement.querySelector('.popup__avatar').src = author.avatar;
  return adElement;
};

export {renderOffer};
