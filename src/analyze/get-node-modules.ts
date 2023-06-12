import type { NodeModuleFrequency } from "../types";

export const getNodeModules = (dataArray: string[]) => {
  const frequency: NodeModuleFrequency = {};

  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i].includes("node_modules")) {
      const nodeModule = dataArray[i].substring(0, dataArray[i].indexOf("/"));
      if (frequency[nodeModule]) {
        frequency[nodeModule]++;
      } else {
        frequency[nodeModule] = 1;
      }
    }
  }
  return frequency;
};
