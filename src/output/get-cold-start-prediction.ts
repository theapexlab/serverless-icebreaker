import { calculateColdStartPrediction } from "../utils/calculate-cold-start-prediction";

const sizesOfLambdasWithDurations = [
  ["1MB", "150MS"],
  ["19.6MB", "692MS"],
  ["30.2MB", "1716MS"],
  ["52.8MB", "2515MS"]
];

export const getColdStartPrediction = (lambdaSize: number) => {
  const newSizesOfLambdasWithDurations = [...sizesOfLambdasWithDurations];

  for (const [size, duration] of newSizesOfLambdasWithDurations) {
    const sizeValue = parseFloat(size);
    const durationValue = parseFloat(duration);

    if (lambdaSize <= sizeValue) {
      return calculateColdStartPrediction(lambdaSize, durationValue, sizeValue);
    }
  }

  const [largestSize, largestDuration] = newSizesOfLambdasWithDurations.pop()!;
  return calculateColdStartPrediction(
    lambdaSize,
    parseFloat(largestDuration),
    parseFloat(largestSize)
  );
};
