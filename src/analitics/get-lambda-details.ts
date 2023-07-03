import type { Configuration, LambdaData } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { calculateWarningThresholdMB } from "../utils/get-warning-threshold";
import { getLambdaData } from "./get-lambda-data";

export const getLambdaDetail = (config: Configuration, files: string[]) => {
  const acceptableLambdas: LambdaData[] = [];
  const lambdasWithWarnings: LambdaData[] = [];
  const lambdasWithErrors: LambdaData[] = [];

  files.forEach(file => {
    const lambdaData: LambdaData = getLambdaData(file);
    const lambdaSizeInMegabyte = byteToMegabyte(lambdaData.size);
    const overErrorThreshold = lambdaSizeInMegabyte > config.errorThresholdMB;
    const overWarningThreshold =
      !overErrorThreshold && lambdaSizeInMegabyte > calculateWarningThresholdMB(config.errorThresholdMB);

    if (overErrorThreshold) {
      lambdasWithErrors.push(lambdaData);
    } else if (overWarningThreshold) {
      lambdasWithWarnings.push(lambdaData);
    } else {
      acceptableLambdas.push(lambdaData);
    }
  });

  return {
    acceptableLambdas,
    lambdasWithWarnings,
    lambdasWithErrors
  };
};
