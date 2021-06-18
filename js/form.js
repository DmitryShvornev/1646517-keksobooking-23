const setInactive = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');
  const fieldsets = adForm.querySelectorAll('fieldset');
  for (const fieldset of fieldsets) {
    fieldset.disabled = true;
  }
  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.add('map__filters--disabled');
  const selects = mapFilters.querySelectorAll('select');
  for (const select of selects) {
    select.disabled = true;
  }
};

setInactive();

const setActive = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');
  const fieldsets = adForm.querySelectorAll('fieldset');
  for (const fieldset of fieldsets) {
    fieldset.disabled = false;
  }
  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.remove('map__filters--disabled');
  const selects = mapFilters.querySelectorAll('select');
  for (const select of selects) {
    select.disabled = false;
  }
};

setActive();

export {setInactive, setActive};
