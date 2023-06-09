import { LambdaData, Metrics } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { warningThresholdMB } from "../utils/get-warning-threshold";

export const createMetrics = (
  lambdaData: LambdaData[],
  errorThresholdMB: number
): Metrics => {
  const result: Metrics = {
    numberOfLambdas: lambdaData.length,
    numberOfErrorsAndWarnings: 0,
    averageLambdaSize: 0,
    largestLambdaSize: 0,
    smallestLambdaSize: Number.MAX_SAFE_INTEGER,
  };

  lambdaData.map((item) => {
    if (
      byteToMegabyte(item.lambdaSize) > warningThresholdMB(errorThresholdMB)
    ) {
      result.numberOfErrorsAndWarnings++;
    }

    result.averageLambdaSize += item.lambdaSize / result.numberOfLambdas;
    result.largestLambdaSize = Math.max(
      result.largestLambdaSize,
      item.lambdaSize
    );
    result.smallestLambdaSize = Math.min(
      item.lambdaSize,
      result.smallestLambdaSize
    );
  });

  return result;
};
