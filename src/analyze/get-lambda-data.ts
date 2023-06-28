import path from "path";

import { getLambdaSize, readLambdaFile } from ".";
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
  const lambda = readLambdaFile(file);

  const nodeModules = getNodeModules(lambda.toString().split(SEARCH_TERM));

  const lambdaSize = getLambdaSize(file);

  const lambdaData: LambdaData = {
    lambdaName: getLambdaName(file),
    lambdaSize: lambdaSize,
    importedModules: Object.keys(nodeModules).length,
    mostFrequentModules: countMostUsedNodeModules(nodeModules),
    possibleColdStartDuration: byteToMegabyte(lambdaSize)
  };
  return lambdaData;
};
