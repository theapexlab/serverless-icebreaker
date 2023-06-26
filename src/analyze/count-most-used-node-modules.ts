import type { MostUsedNodeModules, NodeModuleFrequency } from "../types";

export const countMostUsedNodeModules = (
  data: NodeModuleFrequency
): MostUsedNodeModules => {
  const sortedEntries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const topEntries = sortedEntries.slice(0, 3);
  const totalFrequency = Object.values(data).reduce((a, b) => a + b, 0);

  const mostUsedNodeModules = Object.fromEntries(
    topEntries.map(([key, value]) => [
      key,
      ((value / totalFrequency) * 100).toFixed(2) + "%"
    ])
  );

  return mostUsedNodeModules;
};
