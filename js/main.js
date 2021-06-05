const ADS_NUMBER = 10;
const HOUSING_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = ['wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS_LINKS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const TITLES = [
  'Выгодное',
  'Заманчивое',
  'Замечательное',
  'Великолепное',
  'Горячее',
  'Супер',
];
const DESCRIPTIONS = [
  'Роскошное',
  'Комфортабельное',
  'Современное',
  'Удобно расположенное',
  'Уютное',
];

function getRandomDecimal(first, last) {
  if (first < 0 || last < 0) {
    return 0;
  } else if (last < first) {
    let swap = 0;
    swap = last;
    last = first;
    first = swap;
  } else if (last === first) {
    return first;
  }
  let randomDecimal = 0;
  randomDecimal = first + Math.random() * (last + 1 - first);
  return Math.floor(randomDecimal);
}

function getRandomFloat(first, last, fractionDegree) {
  if (first < 0.0 || last < 0.0 || fractionDegree < 0) {
    return 0.0;
  } else if (last < first) {
    let swap = 0.0;
    swap = last;
    last = first;
    first = swap;
  } else if (last === first) {
    return first;
  }
  let randomFloat = (first + Math.random() * (last - first));
  randomFloat = randomFloat.toFixed(fractionDegree);
  return randomFloat;
}

const getRandomArrayElement = (elements) => (elements[getRandomDecimal(0, elements.length - 1)]);

const createAd = (number) => {
  const lat = getRandomFloat(35.65000, 35.70000, 5);
  const lng = getRandomFloat(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: `img/avatars/user${number < 10 ? 0 : ''}${number}.png`,
    },
    offer: {
      title: `${getRandomArrayElement(TITLES)} предложение!`,
      address: `${lat}, ${lng}`,
      price: getRandomDecimal(1000, 10000),
      type: getRandomArrayElement(HOUSING_TYPES),
      rooms: getRandomDecimal(1, 3),
      guests: getRandomDecimal(1, 5),
      checkin: getRandomArrayElement(CHECKIN_TIMES),
      checkout: getRandomArrayElement(CHECKOUT_TIMES),
      features: Array.from(new Set(Array(getRandomDecimal(1, 6)).fill(null).map(() => getRandomArrayElement(FEATURES)))),
      description: `${getRandomArrayElement(DESCRIPTIONS)} жилье!`,
      photos: Array(getRandomDecimal(1, 10)).fill(null).map(() => getRandomArrayElement(PHOTOS_LINKS)),
    },
    location: {
      lat,
      lng,
    },
  };
};

const ads = new Array(ADS_NUMBER).fill(null);
for (let number = 0; number < ads.length; number++) {
  ads[number] = createAd(number + 1);
}
