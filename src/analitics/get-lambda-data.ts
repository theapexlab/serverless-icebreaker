import { basename as pathBasename, dirname } from "path";
import { readFile, stat } from "fs/promises";
import { getColdStartPrediction } from "../output/get-cold-start-prediction";
import type { LambdaData } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { DISSALLOWED_FILE_NAMES, SEARCH_TERM } from "../constants";
import { countMostUsedNodeModules } from "./count-most-used-node-modules";
import { getNodeModules } from "./get-node-modules";

const getLambdaName = (file: string) => {
  if (DISSALLOWED_FILE_NAMES.includes(pathBasename(file))) {
    return pathBasename(dirname(file));
  }
  return pathBasename(file);
};

export const getLambdaData = async (file: string): Promise<LambdaData> => {
  const lambda = readFile(file);

  const nodeModules = getNodeModules(lambda.toString().split(SEARCH_TERM));

  const lambdaStat = await stat(file);
  const lambdaSize = lambdaStat.size;

  const lambdaData: LambdaData = {
    name: getLambdaName(file),
    size: lambdaSize,
    importedModules: Object.keys(nodeModules).length,
    mostFrequentModules: countMostUsedNodeModules(nodeModules),
    possibleColdStartDuration: getColdStartPrediction(byteToMegabyte(lambdaSize))
  };
  return lambdaData;
};
