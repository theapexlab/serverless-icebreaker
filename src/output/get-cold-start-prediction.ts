import { calculateColdStartPrediction } from "../utils/calculate-cold-start-prediction";

const sizesOfLambdasWithDurations = [
  ["1MB", "150MS"],
  ["19.6MB", "692MS"],
  ["30.2MB", "1716MS"],
  ["52.8MB", "2515MS"]
];

const getLastEntry = (array: Array<string[]>) => {
  return [...array].pop()!;
};

const findMatchingPrediction = (lambdaSize: number) => {
  return sizesOfLambdasWithDurations.find(
    ([size]) => lambdaSize <= parseFloat(size)
  );
};

export const getColdStartPrediction = (lambdaSize: number) => {
  const [largestSize, longestDuration] = getLastEntry(
    sizesOfLambdasWithDurations
  );

  const matchingPrediction = findMatchingPrediction(lambdaSize);

  if (matchingPrediction) {
    const [size, duration] = matchingPrediction;
    const sizeValue = parseFloat(size);
    const durationValue = parseFloat(duration);
    return calculateColdStartPrediction(lambdaSize, durationValue, sizeValue);
  }

  return calculateColdStartPrediction(
    lambdaSize,
    parseFloat(longestDuration),
    parseFloat(largestSize)
  );
};
