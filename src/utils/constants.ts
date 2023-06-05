import { Configuration } from "../types";

export const defaultConfig: Configuration = {
  searchTerm: "// node_modules/",
  buildPath: ".sst/artifacts",
  warningTresholdMB: 10,
  showOnlyErrors: false,
  filterByName: "",
};
