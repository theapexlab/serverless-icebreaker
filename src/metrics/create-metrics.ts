import type { LambdaData, Metrics } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { calculateWarningThresholdMB } from "../utils/get-warning-threshold";

export const createMetrics = (lambdaData: LambdaData[], errorThresholdMB: number): Metrics => {
  const initMetrics: Metrics = {
    numberOfLambdas: lambdaData.length,
    numberOfErrorsAndWarnings: 0,
    averageLambdaSize: 0,
    largestLambdaSize: 0,
    smallestLambdaSize: lambdaData.length ? Number.MAX_SAFE_INTEGER : 0
  };

  const calculatedMetrics = lambdaData.reduce((metrics: Metrics, item: LambdaData) => {
    const itemSizeMB = byteToMegabyte(item.size);
    const isAboveErrorThreshold = itemSizeMB > calculateWarningThresholdMB(errorThresholdMB);

    return {
      ...metrics,
      numberOfErrorsAndWarnings: isAboveErrorThreshold
        ? metrics.numberOfErrorsAndWarnings + 1
        : metrics.numberOfErrorsAndWarnings,
      largestLambdaSize: Math.max(metrics.largestLambdaSize, item.size),
      smallestLambdaSize: Math.min(metrics.smallestLambdaSize, item.size)
    };
  }, initMetrics);

  return {
    ...calculatedMetrics,
    averageLambdaSize: (calculatedMetrics.largestLambdaSize + calculatedMetrics.smallestLambdaSize) / 2
  };
};
