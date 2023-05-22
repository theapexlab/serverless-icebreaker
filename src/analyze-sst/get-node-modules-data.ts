import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { sstSearchTerm, warningTreshold } from "../consts";
import { countMostUsedNodeModules } from "./count-most-used-node-modules";
import { getNodeModules } from "./get-node-modules";

export const getNodeModulesData = (
  data: string,
  lambdaFunction: string,
  size: number
) => {
  const nodeModules = getNodeModules(data.toString().split(sstSearchTerm));

  const mostFrequentModules = countMostUsedNodeModules(nodeModules);
  const termCount = Object.keys(nodeModules).length;

  let result: string;
  let answer1 = "";
  let answer2 = "";
  let answer3 = "";
  let answer4 = "";

  if (size > warningTreshold) {
    answer1 = `❌ Lambda: ${lambdaFunction}\n`;
    answer2 = ` Size: ${byteToMegabyte(size)}\n`;
    answer3 = ` Imported modules: ${termCount}\n`;
    answer4 = `   Most used libs: ${mostFrequentModules}\n`;
  } else {
    answer1 = `✅ Lambda: ${lambdaFunction}\n`;
  }

  console.log(answer1 + answer2 + answer3 + answer4 + "\n");
};
