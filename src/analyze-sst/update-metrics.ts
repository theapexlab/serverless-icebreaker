import { Metric } from "../types";

export const updateMetrics = (
  metrics: Metric,
  lambdaSize: number,
  isSafeSize: boolean
): Metric => {
  if (!isSafeSize) {
    metrics.numberOfWarnings++;
  }
  metrics.averageLambdaSize += lambdaSize / metrics.numberOfLambdas;
  metrics.largestLambdaSize = Math.max(metrics.largestLambdaSize, lambdaSize);
  metrics.smallestLambdaSize = Math.min(metrics.smallestLambdaSize, lambdaSize);

  return metrics;
};
