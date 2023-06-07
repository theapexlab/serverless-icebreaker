export type NodeModuleFrequency = {
  [key: string]: number;
};

export type MostUsedNodeModules = {
  [key: string]: string;
};

export type Configuration = {
  buildPath: string;
  searchTerm: string;
  warningThresholdMB: number;
  detailedReport: boolean;
  showOnlyErrors: boolean;
  filterByName: string;
  metadataOptIn: boolean;
};

export type Metrics = {
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

export type OutputTypes = "warning" | "error";

export interface MixpanelMetrics extends Metrics {
  thresholdUsed: number;
  filterUsed: boolean;
  appVersion: string;
}
