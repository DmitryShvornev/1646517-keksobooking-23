const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const MIN_PRICES = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const selects = mapFilters.querySelectorAll('select');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const housingTypeSelect = adForm.querySelector('#type');
const roomNumberSelect = adForm.querySelector('#room_number');
const roomCapacitySelect = adForm.querySelector('#capacity');

const setInactive = () => {
  adForm.classList.add('ad-form--disabled');
  for (const fieldset of fieldsets) {
    fieldset.disabled = true;
  }
  mapFilters.classList.add('map__filters--disabled');
  for (const select of selects) {
    select.disabled = true;
  }
};

const setActive = () => {
  adForm.classList.remove('ad-form--disabled');
  for (const fieldset of fieldsets) {
    fieldset.disabled = false;
  }
  mapFilters.classList.remove('map__filters--disabled');
  for (const select of selects) {
    select.disabled = false;
  }
};

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Необходимо ещё ${ MIN_TITLE_LENGTH - valueLength } символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${ valueLength - MAX_TITLE_LENGTH } символов`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
});

priceInput.addEventListener('input', () => {
  const value = Number(priceInput.value);
  const housingType = housingTypeSelect.value;
  if (value < MIN_PRICES[housingType]) {
    priceInput.setCustomValidity(`Необходимо повысить цену на ${ MIN_PRICES[housingType] - value } руб./ночь`);
  } else if (value > MAX_PRICE_VALUE) {
    priceInput.setCustomValidity(`Необходимо понизить цену на ${ value - MAX_PRICE_VALUE } руб./ночь`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
});

roomNumberSelect.addEventListener('input', () => {
  const value = roomNumberSelect.value;
  if (Number(value) === 1) {
    roomCapacitySelect.querySelectorAll('option').forEach((item) => {
      if (Number(item.value) !== 1) {
        item.remove();
      }
    });
  } else if (Number(value) === 2) {
    roomCapacitySelect.querySelectorAll('option').forEach((item) => {
      if (Number(item.value) > 2 || Number(item.value) < 1) {
        item.remove();
      }
    });
  } else if (Number(value) === 3) {
    roomCapacitySelect.querySelectorAll('option').forEach((item) => {
      if (Number(item.value) < 1) {
        item.remove();
      }
    });
  } else {
    roomCapacitySelect.querySelectorAll('option').forEach((item) => {
      if (Number(item.value) !== 0) {
        item.remove();
      }
    });
  }
});

export {setInactive, setActive};
