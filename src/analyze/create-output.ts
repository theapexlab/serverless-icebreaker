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

  output.push(
    `📊 Metrics: \n   Number of lambdas: ${
      metrics.numberOfLambdas
    }\n   Number of warnings: ${
      metrics.numberOfWarnings
    }\n   Error threshold: ${
      config.errorThresholdMB
    } MB\n   Warning threshold: ${
      warningThresholdMB()
    } MB\n   Average lambda size: ${formatSizeOutput(
      metrics.averageLambdaSize
    )} \n   Largest lambda size: ${formatSizeOutput(
      metrics.largestLambdaSize
    )} \n   Smallest lambda size: ${formatSizeOutput(
      metrics.smallestLambdaSize
    )} \n`
  );
  return output;
};

const getOutputMessage = (module: LambdaData, type: OutputTypes) => {
  const title = `${type} ${module.lambdaName}`;

  return type === OutputTypes.SUCCESS
    ? `${title}\n`
    : `${title}
  Lambda size: ${byteToMegabyte(module.lambdaSize)} MB
  Imported modules: ${module.importedModules}
  Most frequent modules: ${JSON.stringify(module.mostFrequentModules)}\n`;
};
