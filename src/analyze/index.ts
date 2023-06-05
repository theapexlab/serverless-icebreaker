import { existsSync, readFileSync, statSync } from "fs";

import path from "path";
import { config, projectRoot } from "../..";
import { LambdaData, Metric } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { Messages } from "../utils/messages";
import { createMetrics } from "./create-metrics";
import { getLambdaData } from "./get-lambda-data";
import { printResults } from "./print-result";
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

  const acceptableModules: LambdaData[] = [];
  const modulesWithWarnings: LambdaData[] = [];

  files.forEach((file) => {
    const lambdaData: LambdaData = getLambdaData(file);
    const isSafeSize: boolean =
      byteToMegabyte(lambdaData.lambdaSize) < config.warningTresholdMB;

    if (isSafeSize) {
      acceptableModules.push(lambdaData);
    } else {
      modulesWithWarnings.push(lambdaData);
    }
  });
  const metrics: Metric = createMetrics(
    acceptableModules.concat(modulesWithWarnings)
  );
  printResults(acceptableModules, modulesWithWarnings, metrics);
};
