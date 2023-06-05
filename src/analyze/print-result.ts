import { config } from "../..";
import { LambdaData, Metric } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { formatSizeOutput } from "../utils/format-size-output";

export const printResults = (
  acceptableModules: LambdaData[],
  modulesWithWarnings: LambdaData[],
  metrics: Metric
) => {
  if (!config.showOnlyErrors) {
    acceptableModules.forEach((module) => {
      console.info(`✅ ${module.lambdaName}`);
    });
    console.info("\n");
  }
  modulesWithWarnings.forEach((module) => {
    console.warn(`❌ ${module.lambdaName}`);
    console.warn(`   Lambda size: ${byteToMegabyte(module.lambdaSize)} MB`);
    console.warn(`   Imported modules: ${module.importedModules}`);
    console.warn(
      `   Most frequent modules: ${JSON.stringify(
        module.mostFrequentModules
      )}\n`
    );
  });

  console.info(
    `📊 Metrics: \n\n   Number of lambdas: ${
      metrics.numberOfLambdas
    }\n   Number of warnings: ${
      metrics.numberOfWarnings
    }\n   Average lambda size: ${formatSizeOutput(
      metrics.averageLambdaSize
    )} \n   Largest lambda size: ${formatSizeOutput(
      metrics.largestLambdaSize
    )} \n   Smallest lambda size: ${formatSizeOutput(
      metrics.smallestLambdaSize
    )} `
  );
};