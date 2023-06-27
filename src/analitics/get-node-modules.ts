import type { NodeModuleFrequency } from "../types";

export const getNodeModules = (dataArray: string[]) => {
  const frequency: NodeModuleFrequency = {};

  dataArray.forEach(data => {
    if (data.includes("node_modules")) {
      const nodeModule = data.substring(0, data.indexOf("/"));
      if (frequency[nodeModule]) {
        frequency[nodeModule]++;
      } else {
        frequency[nodeModule] = 1;
      }
    }
  });
  return frequency;
};
