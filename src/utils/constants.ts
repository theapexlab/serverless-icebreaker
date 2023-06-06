import { Configuration } from "../types";

export const defaultConfig: Configuration = {
  buildPath: ".sst/artifacts",
  searchTerm: "// node_modules/",
  warningThresholdMB: 10,
  detailedReport: false,
  showOnlyErrors: false,
  filterByName: "",
};

export const warningPercentage = 10; // 10% less than warningThresholdMB