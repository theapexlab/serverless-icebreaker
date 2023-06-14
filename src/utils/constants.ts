import type { Configuration } from "../types";

export const defaultConfig: Configuration = {
  buildPath: ".sst/artifacts",
  searchTerm: "// node_modules/",
  errorThresholdMB: 10,
  metadataOptIn: true,
  detailedReport: false,
  showOnlyErrors: false,
  filterByName: "",
  ignorePattern: ""
};
