import path from "path";
import { config } from "../..";
import { readLambdaFile, getLambdaSize } from ".";
import { LambdaData } from "../types";
import { countMostUsedNodeModules } from "./count-most-used-node-modules";
import { getNodeModules } from "./get-node-modules";

export const getLambdaData = (file: string): LambdaData => {
  const lambda = readLambdaFile(file);

  const nodeModules = getNodeModules(
    lambda.toString().split(config.searchTerm)
  );

  const lambdaData: LambdaData = {
    lambdaName: path.basename(file),
    lambdaSize: getLambdaSize(file),
    importedModules: Object.keys(nodeModules).length,
    mostFrequentModules: countMostUsedNodeModules(nodeModules),
  };
  return lambdaData;
};
