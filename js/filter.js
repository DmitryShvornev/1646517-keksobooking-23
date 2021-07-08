const mapFilters = document.querySelectorAll('.map__filter');
const mapFilterForm = document.querySelector('.map__filters');

const prices = {
  'middle': (value) => value >= 10000  && value <= 50000,
  'low': (value) =>  value < 10000,
  'high': (value) => value > 50000,
};

const adFilter = ({offer}) => {
  const housingCondition = (mapFilters[0].value === 'any') ? true : (offer.type === mapFilters[0].value);
  const pricesCondition = (mapFilters[1].value === 'any') ? true : (prices[mapFilters[1].value](offer.price));
  const roomsCondition = (mapFilters[2].value === 'any') ? true : (offer.rooms === mapFilters[2].value);
  const guestsCondition = (mapFilters[3].value === 'any') ? true : (offer.rooms === mapFilters[3].value);
  return housingCondition && pricesCondition && roomsCondition && guestsCondition;
};

const initFilterEventLoader = (handler) => {
  mapFilterForm.addEventListener('change', handler);
};

export{adFilter, initFilterEventLoader};
