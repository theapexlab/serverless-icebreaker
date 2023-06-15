export const predictColdStartDuration = (lambdaSize: number) => {
  if (lambdaSize <= 1) {
    return 150;
  } else if (lambdaSize <= 19.6) {
    return Math.max(Math.round(lambdaSize * (692 / 19.6)), 150);
  } else if (lambdaSize <= 30.2) {
    return Math.max(Math.round(lambdaSize * (1716 / 30.2)), 692);
  } else {
    return Math.max(Math.round(lambdaSize * (2515 / 52.8)), 1716);
  }
};
