import path from "path";

import type { LambdaData } from "../types";

import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { getLambdaSize, readLambdaFile } from "./analyze";
import { DISSALLOWED_FILE_NAMES } from "../utils/constants";
import { getNodeModules } from "./get-node-modules";
import { countMostUsedNodeModules } from "./count-most-used-node-modules";

const getLambdaName = (file: string) => {
  if (DISSALLOWED_FILE_NAMES.includes(path.basename(file))) {
    return path.basename(path.dirname(file));
  }
  return path.basename(file);
};

export const getLambdaData = (file: string, searchTerm: string): LambdaData => {
  const lambda = readLambdaFile(file);

  const nodeModules = getNodeModules(lambda.toString().split(searchTerm));

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
