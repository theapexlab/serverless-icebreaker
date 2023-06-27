import type { Configuration } from "../types";

export const SEARCH_TERM = "// node_modules/";

export const defaultConfig: Configuration = {
  buildPath: ".sst/artifacts",
  errorThresholdMB: 10,
  metadataOptIn: true,
  detailedReport: false,
  showOnlyErrors: false,
  filterByName: "",
  ignorePattern: ""
};
