import path from "path";

import { readLambdaFile, getLambdaSize } from ".";
import type { LambdaData } from "../types";
import { countMostUsedNodeModules } from "./count-most-used-node-modules";
import { getNodeModules } from "./get-node-modules";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { getColdStartPrediction } from "../output/get-cold-start-prediction";

export const getLambdaData = (file: string, searchTerm: string): LambdaData => {
  const lambda = readLambdaFile(file);

  const nodeModules = getNodeModules(lambda.toString().split(searchTerm));

  const lambdaSize = getLambdaSize(file);

  const lambdaData: LambdaData = {
    lambdaName: path.basename(file),
    lambdaPath: file,
    lambdaSize: lambdaSize,
    importedModules: Object.keys(nodeModules).length,
    mostFrequentModules: countMostUsedNodeModules(nodeModules),
    possibleColdStartDuration: getColdStartPrediction(
      byteToMegabyte(lambdaSize)
    )
  };
  return lambdaData;
};
