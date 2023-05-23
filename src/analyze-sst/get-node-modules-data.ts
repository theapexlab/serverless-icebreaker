import { config } from "../..";
import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { countMostUsedNodeModules } from "./count-most-used-node-modules";
import { getNodeModules } from "./get-node-modules";

export const getNodeModulesData = (
  data: string,
  lambdaFunction: string,
  size: number
) => {
  const nodeModules = getNodeModules(data.toString().split(config.searchTerm));

  const mostFrequentModules = countMostUsedNodeModules(nodeModules);
  const termCount = Object.keys(nodeModules).length;

  if (size < config.warningTreshold) {
    console.log(`✅ Lambda: ${lambdaFunction}`);
  } else {
    console.log(`❌ Lambda: ${lambdaFunction}`);
    console.log(` Size: ${byteToMegabyte(size)}`);
    console.log(` Imported modules: ${termCount}`);
    console.log(`   Most used libs: ${mostFrequentModules}\n`);
  }
};
