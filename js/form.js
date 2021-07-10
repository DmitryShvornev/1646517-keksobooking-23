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
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const conditions = {
  '1': (value) => value !== 1,
  '2': (value) => value > 2 || value < 1,
  '3': (value) => value < 1,
  '100': (value) => value !== 0,
};

const PHOTO_SIZE = 70;

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
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
const avatarChooser = document.querySelector('.ad-form__field');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('.ad-form__upload');
const photoContainer = document.querySelector('.ad-form__photo');
const photo = document.createElement('img');
photo.width = PHOTO_SIZE;
photo.height = PHOTO_SIZE;
photoContainer.appendChild(photo);
const photoPreview = document.querySelector('.ad-form__photo img');

const imageUpload = (file, imageElement) => {
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      imageElement.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

const onAvatarChange = (evt) => imageUpload(evt.target.files[0], avatarPreview);
const onPhotoChange = (evt) => imageUpload(evt.target.files[0], photoPreview);

avatarChooser.addEventListener('change', onAvatarChange);
photoChooser.addEventListener('change', onPhotoChange);

const toggleState = (flag) => {
  adForm.classList.toggle('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = flag;
  });
  mapFilters.classList.toggle('map__filters--disabled');
  selects.forEach((select) => {
    select.disabled = flag;
  });
};

const setInactive = () => {
  toggleState(true);
};

const setActive = () => {
  toggleState(false);
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

const onKeyDown = (evt) => {
  if (evt.code === 'Escape') {
    onRemoveMessage();
  }
};


function onRemoveMessage() {
  document.querySelectorAll('.success, .error').forEach((messageElement) => messageElement.remove());
  document.removeEventListener('click', onRemoveMessage);
  document.removeEventListener('keydown', onKeyDown);
}

export {setInactive, setActive, adForm, successMessageTemplate, errorMessageTemplate, onRemoveMessage, onKeyDown};
