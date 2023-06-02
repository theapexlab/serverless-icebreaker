import { config } from "../..";
import { LambdaData, Metrics } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";

export const createOutput = (
  acceptableModules: LambdaData[],
  modulesWithWarnings: LambdaData[],
  metrics: Metrics
) => {
  const output: string[] = [];
  if (!config.showOnlyErrors) {
    acceptableModules.forEach((module) => {
      output.push(`✅ ${module.lambdaName}\n`);
    });
  }
  modulesWithWarnings.forEach((module) => {
    output.push(`❌ ${module.lambdaName}
    Lambda size: ${byteToMegabyte(module.lambdaSize)} MB
    Imported modules: ${module.importedModules}
    Most frequent modules: ${JSON.stringify(module.mostFrequentModules)}\n`);
  });
  output.push(
    `📊 Metrics: \n   Number of lambdas: ${
      metrics.numberOfLambdas
    }\n   Number of warnings: ${
      metrics.numberOfWarnings
    }\n   Average lambda size: ${byteToMegabyte(
      metrics.averageLambdaSize
    )} MB\n   Largest lambda size: ${byteToMegabyte(
      metrics.largestLambdaSize
    )} MB\n   Smallest lambda size: ${byteToMegabyte(
      metrics.smallestLambdaSize
    )} MB\n`
  );
  return output;
};
