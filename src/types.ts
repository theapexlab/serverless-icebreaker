export type NodeModuleFrequency = {
  [key: string]: number;
};

export type Configuration = {
  buildPath: string;
  warningTreshold: 20000000;
  searchTerm: "// node_modules/";
};
