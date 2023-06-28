import type { MostUsedNodeModules, NodeModuleFrequency } from "../types";
import { getPercentageString } from "../utils/get-percentage";

export const countMostUsedNodeModules = (
  data: NodeModuleFrequency
): MostUsedNodeModules => {
  const sortedModulesByFrequency = Object.entries(data).sort(
    (a, b) => b[1] - a[1]
  );

  const topThreeModules = sortedModulesByFrequency.slice(0, 3);

  const sumOfModuleFunctions = Object.values(data).reduce((a, b) => a + b, 0);

  const mostUsedNodeModules = topThreeModules
    .map(([key, value]) => [
      key,
      getPercentageString(value, sumOfModuleFunctions)
    ])
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

  return mostUsedNodeModules;
};
