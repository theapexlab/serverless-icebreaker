import {
  getArtifactsSubfolders,
  getLambdaFilePath,
  getLambdaSize,
  getSubfolderPath,
  readLambdaFile,
} from "../utils/path-utils";
import { getNodeModulesData } from "./get-node-modules-data";

export const analyzeSST = () => {
  const subfolders = getArtifactsSubfolders();
  subfolders.forEach((subfolder) => {
    const subfolderPath = getSubfolderPath(subfolder.name);
    try {
      const lambdaFunction = getLambdaFilePath(subfolderPath);
      const lambdaData = readLambdaFile(subfolderPath, lambdaFunction);
      const lambdaSize = getLambdaSize(subfolderPath, lambdaFunction);
      getNodeModulesData(lambdaData.toString(), lambdaFunction, lambdaSize);
    } catch (error) {
      console.warn(`${subfolderPath} is empty \n`);
    }
  });
};
