import { calculateColdStartPrediction } from "../utils/calculate-cold-start-prediction";

const sizesOfLambdasWithDurations = [
  ["1MB", "150MS"],
  ["19.6MB", "692MS"],
  ["30.2MB", "1716MS"],
  ["52.8MB", "2515MS"]
];

export const getColdStartPrediction = (lambdaSize: number) => {
  const [largestSize, longestDuration] = [
    ...sizesOfLambdasWithDurations
  ].pop()!;

  const prediction = sizesOfLambdasWithDurations.find(
    ([size]) => lambdaSize <= parseFloat(size)
  );

  if (prediction) {
    const [size, duration] = prediction;
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
