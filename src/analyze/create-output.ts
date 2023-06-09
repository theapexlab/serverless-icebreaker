import { LambdaData, Metrics, OutputTypes } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { warningThresholdMB } from "../utils/get-warning-threshold";
import { formatSizeOutput } from "../utils/format-size-output";

export const createOutput = (
  acceptableLambdas: LambdaData[],
  lambdasWithWarnings: LambdaData[],
  lambdasWithErrors: LambdaData[],
  metrics: Metrics,
  showOnlyErrors: boolean,
  errorThresholdMB: number
) => {
  const output: string[] = [];
  if (!showOnlyErrors) {
    acceptableLambdas.forEach((module) => {
      output.push(
        getOutputMessage(module, OutputTypes.SUCCESS, errorThresholdMB)
      );
    });
  }
  lambdasWithWarnings.forEach((module) => {
    output.push(
      getOutputMessage(module, OutputTypes.WARNING, errorThresholdMB)
    );
  });
  lambdasWithErrors.forEach((module) => {
    output.push(getOutputMessage(module, OutputTypes.ERROR, errorThresholdMB));
  });

  output.push(getMetrics(metrics, errorThresholdMB));
  return output;
};

const getOutputMessage = (
  module: LambdaData,
  type: OutputTypes,
  errorThresholdMB: number
) => {
  const title = `${type} ${module.lambdaName}\n`;

  if (type === OutputTypes.SUCCESS) {
    return title;
  }

  const lambdaSize = byteToMegabyte(module.lambdaSize);
  const modules = module.importedModules;
  const frequentModules = JSON.stringify(module.mostFrequentModules);
  const lambdaDetails = getLambdaDetails(
    lambdaSize,
    modules,
    frequentModules,
    errorThresholdMB
  );
  return `${title} ${lambdaDetails}`;
};

const getLambdaDetails = (
  lambdaSize: number,
  modules: number,
  frequentModules: string,
  errorThresholdMB: number
) =>
  `  Lambda size: ${lambdaSize} MB
   Imported modules: ${modules}
   Most frequent modules: ${frequentModules}\n`;

const getMetrics = (metrics: Metrics, errorThreshold: number) => {
  const warningThreshold = warningThresholdMB(errorThreshold);
  const {
    numberOfLambdas,
    numberOfWarnings,
    averageLambdaSize,
    largestLambdaSize,
    smallestLambdaSize,
  } = metrics;
  const formattedAverageLambdaSize = formatSizeOutput(averageLambdaSize);
  const formattedLargestLambdaSize = formatSizeOutput(largestLambdaSize);
  const formattedSmallestLambdaSize = formatSizeOutput(smallestLambdaSize);

  return `📊 Metrics:
   Number of lambdas: ${numberOfLambdas} 
   Errors / Warnings: ${numberOfWarnings}
   Error threshold: ${errorThreshold} MB
   Warning threshold: ${warningThreshold} MB
   Average lambda size: ${formattedAverageLambdaSize} 
   Largest lambda size: ${formattedLargestLambdaSize} 
   Smallest lambda size: ${formattedSmallestLambdaSize}\n`;
};
