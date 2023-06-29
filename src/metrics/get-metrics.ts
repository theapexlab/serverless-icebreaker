import type { Metrics } from "../types";
import { formatSizeOutput } from "../utils/format-size-output";
import { calculateWarningThresholdMB } from "../utils/get-warning-threshold";

export const getMetrics = (metrics: Metrics, errorThreshold: number) => {
  const warningThreshold = calculateWarningThresholdMB(errorThreshold);
  const { numberOfLambdas, numberOfErrorsAndWarnings, averageLambdaSize, largestLambdaSize, smallestLambdaSize } =
    metrics;
  const formattedAverageLambdaSize = formatSizeOutput(averageLambdaSize);
  const formattedLargestLambdaSize = formatSizeOutput(largestLambdaSize);
  const formattedSmallestLambdaSize = formatSizeOutput(smallestLambdaSize);

  return `📊 Metrics:
   Number of lambdas: ${numberOfLambdas} 
   Errors and Warnings: ${numberOfErrorsAndWarnings}
   Error threshold: ${errorThreshold} MB
   Warning threshold: ${warningThreshold} MB
   Average lambda size: ${formattedAverageLambdaSize} 
   Largest lambda size: ${formattedLargestLambdaSize} 
   Smallest lambda size: ${formattedSmallestLambdaSize}\n`;
};
