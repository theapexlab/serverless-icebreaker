import type { LambdaData } from "../types";
import { OutputTypes } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { getLambdaDetails } from "./get-lambda-details";

export const getOutputMessage = (lambdaData: LambdaData, type: OutputTypes) => {
  const title = `${type} ${lambdaData.name}\n`;

  if (type === OutputTypes.SUCCESS) {
    return title;
  }

  const lambdaSize = byteToMegabyte(lambdaData.size);
  const modules = lambdaData.importedModules;
  const frequentModules = JSON.stringify(lambdaData.mostFrequentModules);

  const lambdaDetails = getLambdaDetails(lambdaSize, modules, frequentModules, lambdaData.possibleColdStartDuration);
  return `${title} ${lambdaDetails}`;
};
