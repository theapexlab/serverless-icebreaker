import { Configuration } from "../types";

export const cstScript = "node ./node_modules/@theapexlab/cold-start-tool/dist";
export const defaultConfig: Configuration = {
  buildPath: ".sst/artifacts",
  searchTerm: "// node_modules/",
  warningThresholdMB: 10,
  detailedReport: false,
  showOnlyErrors: false,
  filterByName: "",
};
