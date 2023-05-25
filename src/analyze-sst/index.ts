import { readFileSync, statSync } from "fs";

import { getNodeModulesData } from "./get-node-modules-data";
import { searchFilesRecursive } from "./search-files-recursive";
import path from "path";
import { config } from "../..";
import { byteToMegabyte } from "../utils/byte-to-megabyte";

export const readLambdaFile = (lambdaPath: string) => readFileSync(lambdaPath);

export const getLambdaSize = (lambdaPath: string) =>
  parseInt(byteToMegabyte(statSync(lambdaPath).size));

export const analyzeSST = () => {
  const projectPath = path.resolve(process.cwd(), config.buildPath);
  const files = searchFilesRecursive(projectPath);

  files.forEach((file) => {
    const lambdaData = readLambdaFile(file);
    const lambdaSize = getLambdaSize(file);
    const lambdaName = path.basename(file);
    getNodeModulesData(lambdaData.toString(), lambdaName, lambdaSize);
  });
};
