export type NodeModuleFrequency = {
  [key: string]: number;
};

export type Configuration = {
  buildPath: string;
  warningTresholdInMegaBytes: number;
  searchTerm: string;
  filterByName: string;
  showOnlyErrors: boolean;
};
