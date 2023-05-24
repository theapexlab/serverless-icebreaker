import { config } from "../..";
import { countMostUsedNodeModules } from "./count-most-used-node-modules";
import { getNodeModules } from "./get-node-modules";

export const getNodeModulesData = (
  data: string,
  lambdaFunction: string,
  size: number
) => {
  if (size < config.warningTreshold) {
    console.log(`✅ Lambda: ${lambdaFunction}`);
  } else {
    const nodeModules = getNodeModules(
      data.toString().split(config.searchTerm)
    );
    const mostFrequentModules = countMostUsedNodeModules(nodeModules);
    const termCount = Object.keys(nodeModules).length;

    console.log(`❌ Lambda: ${lambdaFunction}`);
    console.log(` Size: ${size} MB`);
    console.log(` Imported modules: ${termCount}`);
    console.log(` Most used libs: ${mostFrequentModules}\n`);
  }
};
