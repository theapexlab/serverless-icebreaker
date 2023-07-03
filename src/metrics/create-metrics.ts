import type { LambdaData, Metrics } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { calculateWarningThresholdMB } from "../utils/get-warning-threshold";

export const createMetrics = (lambdaData: LambdaData[], errorThresholdMB: number): Metrics => {
  const result: Metrics = {
    numberOfLambdas: lambdaData.length,
    numberOfErrorsAndWarnings: 0,
    averageLambdaSize: 0,
    largestLambdaSize: 0,
    smallestLambdaSize: Number.MAX_SAFE_INTEGER
  };

  lambdaData.forEach(item => {
    const isLambdaSizeAboveErrorThreshold = byteToMegabyte(item.size) > calculateWarningThresholdMB(errorThresholdMB);

    if (isLambdaSizeAboveErrorThreshold) {
      result.numberOfErrorsAndWarnings++;
    }

    result.largestLambdaSize = Math.max(result.largestLambdaSize, item.size);
    result.smallestLambdaSize = Math.min(item.size, result.smallestLambdaSize);
  });

  result.averageLambdaSize = (result.largestLambdaSize + result.smallestLambdaSize) / 2;

  return result;
};
