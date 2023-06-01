import { Configuration } from "../types";

export const cstScript = "node ./node_modules/@theapexlab/cold-start-tool/dist";
export const defaultConfig: Configuration = {
  searchTerm: "// node_modules/",
  buildPath: ".sst/artifacts",
  warningTresholdInMegaBytes: 10,
  showOnlyErrors: false,
  filterByName: "",
};
