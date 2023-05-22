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

  const icon = size > warningTreshold ? "❌" : "✅";
  console.log(`${icon} Lambda: ${lambdaFunction}`);
  console.log(` Size: ${byteToMegabyte(size)}`);
  console.log(` Imported modules: ${termCount}`);
  console.log(`   Most used libs: ${mostFrequentModules}\n`);
};
