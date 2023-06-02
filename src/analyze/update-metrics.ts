import { Metrics } from "../types";

export const updateMetrics = (
  metrics: Metrics,
  lambdaSize: number,
  isSafeSize: boolean
): Metrics => {
  if (!isSafeSize) {
    metrics.numberOfWarnings++;
  }
  metrics.averageLambdaSize += lambdaSize / metrics.numberOfLambdas;
  metrics.largestLambdaSize = Math.max(metrics.largestLambdaSize, lambdaSize);
  metrics.smallestLambdaSize = Math.min(metrics.smallestLambdaSize, lambdaSize);

  return metrics;
};
