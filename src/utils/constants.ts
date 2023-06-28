import type { Configuration } from "../types";

export const NODE_MODULES = "node_modules";
export const DISSALLOWED_FILE_NAMES = ["handler.js", "handler.mjs"];
export const BUILT_FILE_EXTENSIONS = ["js", "mjs"];
export const COMPRESSED_FILE_EXTENSIONS = ["zip"];
export const MIXPANEL_COLLECTION_NAME = "sib-run";
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
