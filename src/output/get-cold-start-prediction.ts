import { SizesOfLambdasWithDurations } from "../types";
import { calculateColdStartPrediction } from "../utils/calculate-cold-start-prediction";

export const getColdStartPrediction = (lambdaSize: number) => {
  for (const [size, duration] of Object.entries(SizesOfLambdasWithDurations)) {
    const sizeValue = parseFloat(size);
    const durationValue = parseFloat(duration);

    if (lambdaSize <= sizeValue) {
      return calculateColdStartPrediction(lambdaSize, durationValue, sizeValue);
    }
  }

  const largestSize = parseFloat(
    Object.keys(SizesOfLambdasWithDurations).pop()!
  );
  const largestDuration = parseFloat(
    Object.values(SizesOfLambdasWithDurations).pop()!
  );
  return calculateColdStartPrediction(lambdaSize, largestSize, largestDuration);
};
