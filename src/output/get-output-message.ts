import type { LambdaData } from "../types";
import { OutputTypes } from "../types";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { getLambdaDetails } from "./get-lambda-details";

export const getOutputMessage = (module: LambdaData, type: OutputTypes) => {
  const title = `${type} ${module.lambdaName}\n`;

  if (type === OutputTypes.SUCCESS) {
    return title;
  }

  const lambdaSize = byteToMegabyte(module.lambdaSize);
  const modules = module.importedModules;
  const frequentModules = JSON.stringify(module.mostFrequentModules);

  const lambdaDetails = getLambdaDetails(
    lambdaSize,
    modules,
    frequentModules,
    module.possibleColdStartDuration
  );
  return `${title} ${lambdaDetails}`;
};
