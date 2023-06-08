import { config } from "../..";
import { LambdaData, Metrics, OutputTypes } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { warningThresholdMB } from "../utils/get-warning-threshold";
import { formatSizeOutput } from "../utils/format-size-output";

export const createOutput = (
  acceptableLambdas: LambdaData[],
  lambdasWithWarnings: LambdaData[],
  lambdasWithErrors: LambdaData[],
  metrics: Metrics
) => {
  const output: string[] = [];
  if (!config.showOnlyErrors) {
    acceptableLambdas.forEach((module) => {
      output.push(getOutputMessage(module, OutputTypes.SUCCESS));
    });
  }
  lambdasWithWarnings.forEach((module) => {
    output.push(getOutputMessage(module, OutputTypes.WARNING));
  });
  lambdasWithErrors.forEach((module) => {
    output.push(getOutputMessage(module, OutputTypes.ERROR));
  });

  output.push(getMetrics(metrics));
  return output;
};

const getOutputMessage = (module: LambdaData, type: OutputTypes) => {
  const title = `${type} ${module.lambdaName}\n`;

  if (type === OutputTypes.SUCCESS) {
    return title;
  }

  const lambdaSize = byteToMegabyte(module.lambdaSize);
  const modules = module.importedModules;
  const frequentModules = JSON.stringify(module.mostFrequentModules);
  const lambdaDetails = getLambdaDetails(lambdaSize, modules, frequentModules);
  return `${title} ${lambdaDetails}`;
};

const getLambdaDetails = (
  lambdaSize: number,
  modules: number,
  frequentModules: string
) =>
  `  Lambda size: ${lambdaSize} MB
   Imported modules: ${modules}
   Most frequent modules: ${frequentModules}\n`;

const getMetrics = (metrics: Metrics) => {
  const errorThreshold = config.errorThresholdMB;
  const warningThreshold = warningThresholdMB();
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
   Number of warnings: ${numberOfWarnings}
   Error threshold: ${errorThreshold} MB
   Warning threshold: ${warningThreshold} MB
   Average lambda size: ${formattedAverageLambdaSize} 
   Largest lambda size: ${formattedLargestLambdaSize} 
   Smallest lambda size: ${formattedSmallestLambdaSize}\n`;
};
