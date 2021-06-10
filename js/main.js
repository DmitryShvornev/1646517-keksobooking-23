import {createAd, ADS_NUMBER} from './data.js';

const ads = new Array(ADS_NUMBER).fill(null);
for (let number = 0; number < ads.length; number++) {
  ads[number] = createAd(number + 1);
}
