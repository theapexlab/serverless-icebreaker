import { config } from "../..";
import { LambdaData, Metric } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";

export const createMetrics = (lambdaData: LambdaData[]): Metric => {
  const result: Metric = {
    numberOfLambdas: lambdaData.length,
    numberOfWarnings: 0,
    averageLambdaSize: 0,
    largestLambdaSize: 0,
    smallestLambdaSize: Number.MAX_SAFE_INTEGER,
  };

  lambdaData.map((item) => {
    if (byteToMegabyte(item.lambdaSize) > config.warningTresholdMB) {
      result.numberOfWarnings++;
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
