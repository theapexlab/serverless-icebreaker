import path from "path";

import { readFileSync, statSync } from "fs";
import type { LambdaData } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { DISSALLOWED_FILE_NAMES, SEARCH_TERM } from "../utils/constants";
import { countMostUsedNodeModules } from "./count-most-used-node-modules";
import { getNodeModules } from "./get-node-modules";

const getLambdaName = (file: string) => {
  if (DISSALLOWED_FILE_NAMES.includes(path.basename(file))) {
    return path.basename(path.dirname(file));
  }
  return path.basename(file);
};

export const getLambdaData = (file: string): LambdaData => {
  const lambda = readFileSync(file);

  const nodeModules = getNodeModules(lambda.toString().split(SEARCH_TERM));

  const lambdaSize = statSync(file).size;

  const lambdaData: LambdaData = {
    lambdaName: getLambdaName(file),
    lambdaSize: lambdaSize,
    importedModules: Object.keys(nodeModules).length,
    mostFrequentModules: countMostUsedNodeModules(nodeModules),
    possibleColdStartDuration: byteToMegabyte(lambdaSize)
  };
  return lambdaData;
};
