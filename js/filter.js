const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const housingTypeFilter = document.querySelector('#housing-type');
const housingPriceFilter = document.querySelector('#housing-price');
const housingRoomsFilter = document.querySelector('#housing-rooms');
const housingGuestsFilter = document.querySelector('#housing-guests');
const mapFilterForm = document.querySelector('.map__filters');

const prices = {
  'middle': (value) => value >= LOW_PRICE  && value <= HIGH_PRICE,
  'low': (value) =>  value < LOW_PRICE,
  'high': (value) => value > HIGH_PRICE,
};


const adFilter = ({offer}) => {
  const housingCondition = (housingTypeFilter.value === 'any') || (offer.type === housingTypeFilter.value);
  const pricesCondition = (housingPriceFilter.value === 'any') || (prices[housingPriceFilter.value](offer.price));
  const roomsCondition = (housingRoomsFilter.value === 'any') || (offer.rooms === housingRoomsFilter.value);
  const guestsCondition = (housingGuestsFilter.value === 'any') || (offer.rooms === housingGuestsFilter.value);
  const checkedFeatures = document.querySelectorAll('.map__checkbox:checked');
  if (checkedFeatures && !offer.features) {
    return false;
  }
  for (const item of checkedFeatures) {
    if (!offer.features.includes(item.value)) {
      return false;
    }
  }
  return housingCondition && pricesCondition && roomsCondition && guestsCondition;
};

const initFilterEventLoader = (handler) => {
  mapFilterForm.addEventListener('change', handler);
};

export{adFilter, initFilterEventLoader};
