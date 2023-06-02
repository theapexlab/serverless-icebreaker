import { config } from "../..";
import { LambdaData, Metric } from "../types";

export const createMetrics = (
  acceptableModules: LambdaData[],
  modulesWithWarnings: LambdaData[]
): Metric => {
  const data = acceptableModules.concat(modulesWithWarnings);

  const result: Metric = {
    numberOfLambdas: data.length,
    numberOfWarnings: 0,
    averageLambdaSize: 0,
    largestLambdaSize: 0,
    smallestLambdaSize: Number.MAX_SAFE_INTEGER,
  };

  data.map((item) => {
    if (item.lambdaSize > config.warningTreshold) {
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
