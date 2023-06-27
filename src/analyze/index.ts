import { existsSync, readFileSync, rmSync, statSync } from "fs";

import path from "path";
import { commandLineArgs, existingConfig, projectRoot } from "..";
import { sendMetadataToMixpanel } from "../metrics/mixpanel";
import { createOutput } from "../output";
import { getOutputMessage } from "../output/get-output-message";
import {
  OutputTypes,
  type Configuration,
  type LambdaData,
  type Metrics
} from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { configHandler } from "../utils/config-handler";
import { warningThresholdMB } from "../utils/get-warning-threshold";
import { Messages } from "../utils/messages";
import { createMetrics } from "./create-metrics";
import { createDetailedReport, createReport } from "./create-report";
import { getLambdaData } from "./get-lambda-data";
import { searchFilesRecursive } from "./search-files-recursive";
import { decompressFile } from "../utils/decompress";
import { filterByNameExtensionAndIgnorePattern } from "../utils/filter";
import { searchTerm } from "../constants";

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

  const destinationPath = `${config.buildPath}/decompressed`;

  const zippedFiles = searchFilesRecursive(projectPath, ["zip"]);
  if (zippedFiles.length) {
    await decompressFile(zippedFiles, destinationPath);
  }
  const builtFiles = searchFilesRecursive(projectPath, ["js", "mjs"]);

  if (!builtFiles.length) {
    return console.error(Messages.PATH_ERROR);
  }

  const filteredBuildFiles = builtFiles.filter(file =>
    filterByNameExtensionAndIgnorePattern(
      file,
      config.filterByName,
      config.ignorePattern
    )
  );

  const acceptableLambdas: LambdaData[] = [];
  const lambdasWithWarnings: LambdaData[] = [];
  const lambdasWithErrors: LambdaData[] = [];

  filteredBuildFiles.forEach(file => {
    const lambdaData: LambdaData = getLambdaData(file, searchTerm);
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

  if (zippedFiles.length) {
    rmSync(path.resolve(destinationPath), { recursive: true, force: true });
  }
  if (config.metadataOptIn) {
    await sendMetadataToMixpanel("sib-run", metrics, config);
  }

  if (!commandLineArgs.pipeline) {
    const output = createOutput(
      acceptableLambdas,
      lambdasWithWarnings,
      lambdasWithErrors,
      metrics,
      config.showOnlyErrors,
      config.errorThresholdMB
    );

    console.info(output.join("\n"));

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
    return;
  }

  if (lambdasWithErrors.length) {
    console.error(Messages.ERROR_THRESHOLD_EXCEEDED);

    lambdasWithErrors.forEach(module => {
      console.info(getOutputMessage(module, OutputTypes.ERROR));
    });

    process.exit(1);
  }
};
