const adForm = document.querySelector('.ad-form');
const fieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const selects = mapFilters.querySelectorAll('select');

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

export {setInactive, setActive};
