import { existsSync, readFileSync, statSync } from "fs";

import path from "path";
import { commandLineArgs, existingConfig, projectRoot } from "..";
import type { Configuration, LambdaData, Metrics } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { configHandler } from "../utils/config-handler";
import { warningThresholdMB } from "../utils/get-warning-threshold";
import { Messages } from "../utils/messages";
import { createMetrics } from "./create-metrics";
import { getLambdaData } from "./get-lambda-data";
import { searchFilesRecursive } from "./search-files-recursive";
import { createOutput } from "../output";
import { sendMetadataToMixpanel } from "../metrics/mixpanel";
import { createReport, createDetailedReport } from "./create-report";

export const readLambdaFile = (lambdaPath: string) => readFileSync(lambdaPath);

export const getLambdaSize = (lambdaPath: string) => statSync(lambdaPath).size;

export const analyze = async () => {
  const config: Configuration = existingConfig
    ? existingConfig
    : await configHandler();

  if (!existsSync(path.resolve(projectRoot, config.buildPath))) {
    return console.error(Messages.PATH_ERROR);
  }
  const projectPath = path.resolve(projectRoot, config.buildPath);

  const files = searchFilesRecursive(
    projectPath,
    config.filterByName,
    config.ignorePattern
  );
  if (!files.length) {
    return console.error(Messages.PATH_ERROR);
  }
  const acceptableLambdas: LambdaData[] = [];
  const lambdasWithWarnings: LambdaData[] = [];
  const lambdasWithErrors: LambdaData[] = [];

  files.forEach(file => {
    const lambdaData: LambdaData = getLambdaData(file, config.searchTerm);
    const lambdaSizeInMegabyte = byteToMegabyte(lambdaData.lambdaSize);
    const overErrorThreshold = lambdaSizeInMegabyte > config.errorThresholdMB;
    const overWarningThreshold =
      !overErrorThreshold &&
      lambdaSizeInMegabyte > warningThresholdMB(config.errorThresholdMB);

    if (overErrorThreshold) {
      lambdasWithErrors.push(lambdaData);
    } else if (overWarningThreshold) {
      lambdasWithWarnings.push(lambdaData);
    } else {
      acceptableLambdas.push(lambdaData);
    }
  });
  const metrics: Metrics = createMetrics(
    acceptableLambdas.concat(lambdasWithWarnings, lambdasWithErrors),
    config.errorThresholdMB
  );

  if (!commandLineArgs.pipeline) {
    const output = createOutput(
      acceptableLambdas,
      lambdasWithWarnings,
      lambdasWithErrors,
      metrics,
      config.showOnlyErrors,
      config.errorThresholdMB
    );
    if (config.metadataOptIn) {
      sendMetadataToMixpanel("cst-run", metrics, config);
    }

    if (!config.detailedReport) {
      createReport(output);
    } else {
      createDetailedReport(
        acceptableLambdas,
        lambdasWithWarnings,
        lambdasWithErrors,
        metrics
      );
    }
    return console.info(output.join("\n"));
  }

  if (lambdasWithErrors.length) {
    console.error(Messages.ERROR_THRESHOLD_EXCEEDED);
    lambdasWithErrors.map(lambda => console.error(lambda.lambdaName));

    process.exit(1);
  }
};
