import type { NodeModuleFrequency } from "../types";
import { NODE_MODULES } from "../utils/constants";

export const getNodeModules = (dataArray: string[]) => {
  const frequency: NodeModuleFrequency = {};

  dataArray.forEach(data => {
    if (data.includes(NODE_MODULES)) {
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
