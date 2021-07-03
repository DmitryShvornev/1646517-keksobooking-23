import {getRandomDecimal} from './utils.js';

const getRandomArrayElement = (elements) => (elements[getRandomDecimal(0, elements.length - 1)]);

export {getRandomArrayElement};
