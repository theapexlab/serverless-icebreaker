import { existsSync, readFileSync, statSync } from "fs";

import path from "path";
import { projectRoot } from "../..";
import type { LambdaData, Metrics } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { Messages } from "../utils/messages";
import { createMetrics } from "./create-metrics";
import { createOutput } from "./create-output";
import { createDetailedReport, createReport } from "./create-report";
import { getLambdaData } from "./get-lambda-data";
import { searchFilesRecursive } from "./search-files-recursive";
import { configHandler } from "../utils/config-handler";

export const readLambdaFile = (lambdaPath: string) => readFileSync(lambdaPath);

export const getLambdaSize = (lambdaPath: string) => statSync(lambdaPath).size;

export const analyze = async () => {
  const {
    buildPath,
    filterByName,
    searchTerm,
    warningThresholdMB,
    showOnlyErrors,
    detailedReport,
  } = await configHandler();

  if (!existsSync(path.resolve(projectRoot, buildPath))) {
    return console.error(Messages.PATH_ERROR);
  }
  const projectPath = path.resolve(projectRoot, buildPath);

  const files = searchFilesRecursive(projectPath, filterByName);
  if (!files.length) {
    return console.error(Messages.PATH_ERROR);
  }

  const acceptableLambdas: LambdaData[] = [];
  const lambdasWithWarnings: LambdaData[] = [];

  files.forEach((file) => {
    const lambdaData: LambdaData = getLambdaData(file, searchTerm);
    const isSafeSize: boolean =
      byteToMegabyte(lambdaData.lambdaSize) < warningThresholdMB;

    if (isSafeSize) {
      acceptableLambdas.push(lambdaData);
    } else {
      lambdasWithWarnings.push(lambdaData);
    }
  });
  const metrics: Metrics = createMetrics(
    acceptableLambdas.concat(lambdasWithWarnings),
    warningThresholdMB
  );

  const output = createOutput(
    acceptableLambdas,
    lambdasWithWarnings,
    metrics,
    showOnlyErrors
  );
  console.info(output.join("\n"));
  if (!detailedReport) {
    createReport(output);
  } else {
    createDetailedReport(acceptableLambdas, lambdasWithWarnings, metrics);
  }
};
