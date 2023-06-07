import { existsSync, readFileSync, statSync } from "fs";

import path from "path";
import { config, projectRoot } from "../..";
import { sendMetadataToMixpanel } from "../metrics/mixpanel";
import { LambdaData, Metrics } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { Messages } from "../utils/messages";
import { createMetrics } from "./create-metrics";
import { createOutput } from "./create-output";
import { createDetailedReport, createReport } from "./create-report";
import { getLambdaData } from "./get-lambda-data";
import { searchFilesRecursive } from "./search-files-recursive";

export const readLambdaFile = (lambdaPath: string) => readFileSync(lambdaPath);

export const getLambdaSize = (lambdaPath: string) => statSync(lambdaPath).size;

export const analyze = () => {
  if (!existsSync(path.resolve(projectRoot, config.buildPath))) {
    return console.error(Messages.PATH_ERROR);
  }
  const projectPath = path.resolve(projectRoot, config.buildPath);

  const files = searchFilesRecursive(projectPath);
  if (!files.length) {
    return console.error(Messages.PATH_ERROR);
  }

  const acceptableLambdas: LambdaData[] = [];
  const lambdasWithWarnings: LambdaData[] = [];

  files.forEach((file) => {
    const lambdaData: LambdaData = getLambdaData(file);
    const isSafeSize: boolean =
      byteToMegabyte(lambdaData.lambdaSize) < config.warningThresholdMB;

    if (isSafeSize) {
      acceptableLambdas.push(lambdaData);
    } else {
      lambdasWithWarnings.push(lambdaData);
    }
  });
  const metrics: Metrics = createMetrics(
    acceptableLambdas.concat(lambdasWithWarnings)
  );
  const output = createOutput(acceptableLambdas, lambdasWithWarnings, metrics);
  console.info(output.join("\n"));
  if (config.metadataOptIn) {
    sendMetadataToMixpanel("cst-run", metrics);
  }

  if (!config.detailedReport) {
    createReport(output);
  } else {
    createDetailedReport(acceptableLambdas, lambdasWithWarnings, metrics);
  }
};
