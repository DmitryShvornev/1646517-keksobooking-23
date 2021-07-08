const housingTypeFilter = document.querySelector('#housing-type');
const housingPriceFilter = document.querySelector('#housing-price');
const housingRoomsFilter = document.querySelector('#housing-rooms');
const housingGuestsFilter = document.querySelector('#housing-guests');
const mapFilterForm = document.querySelector('.map__filters');
const checkedBenefits = document.querySelectorAll('.map__checkbox:checked');

const prices = {
  'middle': (value) => value >= 10000  && value <= 50000,
  'low': (value) =>  value < 10000,
  'high': (value) => value > 50000,
};


const adFilter = ({offer}) => {
  const housingCondition = (housingTypeFilter.value === 'any') || (offer.type === housingTypeFilter.value);
  const pricesCondition = (housingPriceFilter.value === 'any') || (prices[housingPriceFilter.value](offer.price));
  const roomsCondition = (housingRoomsFilter.value === 'any') || (offer.rooms === housingRoomsFilter.value);
  const guestsCondition = (housingGuestsFilter.value === 'any') || (offer.rooms === housingGuestsFilter.value);
  let benefitsCondition = true;
  if (offer.benefits) {
    for (const item of checkedBenefits) {
      const feature = item.value;
      if (!offer.benefits.includes(feature)) {
        benefitsCondition = false;
      }
    }
  }
  return housingCondition && pricesCondition && roomsCondition && guestsCondition && benefitsCondition;
};

const initFilterEventLoader = (handler) => {
  mapFilterForm.addEventListener('change', handler);
};

export{adFilter, initFilterEventLoader};
