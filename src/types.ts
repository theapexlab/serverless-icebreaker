export type NodeModuleFrequency = {
  [key: string]: number;
};

export type MostUsedNodeModules = {
  [key: string]: string;
};

export type Configuration = {
  buildPath: string;
  warningTresholdMB: number;
  searchTerm: string;
  filterByName: string;
  showOnlyErrors: boolean;
};

export type Metric = {
  numberOfLambdas: number;
  numberOfWarnings: number;
  averageLambdaSize: number;
  largestLambdaSize: number;
  smallestLambdaSize: number;
};

export type LambdaData = {
  lambdaName: string;
  lambdaSize: number;
  importedModules: number;
  mostFrequentModules: MostUsedNodeModules;
};
