export type NodeModuleFrequency = {
  [key: string]: number;
};

export type Configuration = {
  buildPath: string;
  warningTresholdMB: number;
  searchTerm: string;
  filterByName: string;
  showOnlyErrors: boolean;
};
