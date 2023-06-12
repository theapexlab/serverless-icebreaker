import type { MostUsedNodeModules, NodeModuleFrequency } from "../types";

export const countMostUsedNodeModules = (
  data: NodeModuleFrequency
): MostUsedNodeModules =>
  Object.fromEntries(
    Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key, value]) => [
        key,
        ((value / Object.values(data).reduce((a, b) => a + b)) * 100).toFixed(
          2
        ) + "%"
      ])
  );
