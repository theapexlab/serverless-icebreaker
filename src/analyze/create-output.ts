import { config } from "../..";
import { LambdaData, Metrics, OutputTypes } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
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
      output.push(`✅ ${module.lambdaName}\n`);
    });
  }
  lambdasWithWarnings.forEach((module) => {
    output.push(getOutputMessage(module, "warning"));
  });
  lambdasWithErrors.forEach((module) => {
    output.push(getOutputMessage(module, "error"));
  });

  output.push(
    `📊 Metrics: \n   Error threshold: ${
      config.errorThresholdMB
    } MB\n   Number of lambdas: ${
      metrics.numberOfLambdas
    }\n   Number of warnings: ${
      metrics.numberOfWarnings
    }\n   Average lambda size: ${formatSizeOutput(
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
  const icon = type === "warning" ? "🚧 WARNING" : "❌ ERROR";
  return `${icon} ${module.lambdaName}
  Lambda size: ${byteToMegabyte(module.lambdaSize)} MB
  Imported modules: ${module.importedModules}
  Most frequent modules: ${JSON.stringify(module.mostFrequentModules)}\n`;
};
