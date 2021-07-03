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
const conditions = {
  '1': (value) => value !== 1,
  '2': (value) => value > 2 || value < 1,
  '3': (value) => value < 1,
  '100': (value) => value !== 0,
};

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTemplate.cloneNode(true);
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTemplate.cloneNode(true);
const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const selects = mapFilters.querySelectorAll('select');
const titleInput = adForm.querySelector('#title');
const priceInput = adForm.querySelector('#price');
const housingTypeSelect = adForm.querySelector('#type');
const roomNumberSelect = adForm.querySelector('#room_number');
const roomCapacitySelect = adForm.querySelector('#capacity');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');

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

const removeMessage = () => {
  if (document.body.contains(successMessageElement)) {
    successMessageElement.remove();
  } else if (document.body.contains(errorMessageElement)) {
    errorMessageElement.remove();
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
  const condition = conditions[value];
  roomCapacitySelect.querySelectorAll('option').forEach((item) => {
    item.disabled = condition(Number(item.value));
  });
});

housingTypeSelect.addEventListener('input', () => {
  priceInput.placeholder = MIN_PRICES[housingTypeSelect.value];
});

timeInSelect.addEventListener('input', () => {
  timeOutSelect.value = timeInSelect.value;
});

timeOutSelect.addEventListener('input', () => {
  timeInSelect.value = timeOutSelect.value;
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    removeMessage();
  }
});

document.addEventListener('click', () => {
  removeMessage();
});


export {setInactive, setActive, adForm, successMessageElement, errorMessageElement};
