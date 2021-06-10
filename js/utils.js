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

export {getRandomDecimal, getRandomFloat};
