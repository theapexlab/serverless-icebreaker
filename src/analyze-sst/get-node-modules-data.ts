import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { sstSearchTerm, warningTreshold } from "../consts";
import { countMostUsedNodeModules } from "./count-most-used-node-modules";
import { getNodeModules } from "./get-node-modules";

export const getNodeModulesData = (
  data: string,
  lambda: string,
  size: number
) => {
  const nodeModules = getNodeModules(data.toString().split(sstSearchTerm));

  const mostFrequentModules = countMostUsedNodeModules(nodeModules);
  const termCount = Object.keys(nodeModules).length;

  let result: string;

  if (size > warningTreshold) {
    result = `\x1b[31m Lambda: ${lambda}\n Size: ${byteToMegabyte(
      size
    )} megabytes \n Imported modules: ${termCount} \n Most used libs: ${mostFrequentModules}\n`;
  } else {
    result = `\x1b[32m Lambda: ${lambda}\n`;
  }

  console.log(result);
};
