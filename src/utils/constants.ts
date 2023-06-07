import { config } from "../..";
import { Configuration } from "../types";

export const defaultConfig: Configuration = {
  buildPath: ".sst/artifacts",
  searchTerm: "// node_modules/",
  errorThresholdMB: 10,
  detailedReport: false,
  showOnlyErrors: false,
  filterByName: "",
  metadataOptIn: true,
};

export const getWarningThresholdMB = () => {
  return config.errorThresholdMB ? config.errorThresholdMB * 0.9 : 0;
};
