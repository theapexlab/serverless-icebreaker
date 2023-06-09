export type NodeModuleFrequency = {
  [key: string]: number;
};

export type MostUsedNodeModules = {
  [key: string]: string;
};

export type Configuration = {
  buildPath: string;
  searchTerm: string;
  errorThresholdMB: number;
  detailedReport: boolean;
  showOnlyErrors: boolean;
  filterByName: string;
  ignorePattern: string;
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

export enum OutputTypes {
  "SUCCESS" = "✅",
  "WARNING" = "🚧",
  "ERROR" = "❌",
}

export interface MixpanelMetrics extends Metrics {
  thresholdUsed: number;
  filterUsed: boolean;
  appVersion: string;
}
