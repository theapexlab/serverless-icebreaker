import { NodeModuleFrequency } from "../types";

export const countMostUsedNodeModules = (data: NodeModuleFrequency) =>
  JSON.stringify(
    Object.fromEntries(
      Object.entries(data)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([key, value]) => [
          key,
          ((value / Object.values(data).reduce((a, b) => a + b)) * 100).toFixed(
            2
          ) + "%",
        ])
    ),
    null,
    2
  );
