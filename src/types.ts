export type NodeModuleFrequency = Record<string, number>;
export type MostUsedNodeModules = Record<string, string>;

export type Configuration = {
  buildPath: string;
  errorThresholdMB: number;
  detailedReport: boolean;
  showOnlyErrors: boolean;
  filterByName: string;
  ignorePattern: string;
  metadataOptIn: boolean;
};

export type Metrics = {
  numberOfLambdas: number;
  numberOfErrorsAndWarnings: number;
  averageLambdaSize: number;
  largestLambdaSize: number;
  smallestLambdaSize: number;
};

export type LambdaData = {
  name: string;
  size: number;
  importedModules: number;
  possibleColdStartDuration: number;
  mostFrequentModules: MostUsedNodeModules;
};

export enum OutputTypes {
  "SUCCESS" = "✅",
  "WARNING" = "🚧",
  "ERROR" = "❌"
}

export interface MixpanelMetrics extends Metrics {
  thresholdUsed: number;
  filterUsed: boolean;
  appVersion: string;
  projectHashName: string;
  isPipeline?: boolean;
}

export enum ConfigurationMethod {
  "SST" = "Suggested configuration (optimized for SST apps)",
  "SERVERLESS" = "Suggested configuration (optimized for Serverless framework)",
  "CUSTOM" = "Custom configuration"
}

export enum FrameworksBuildPath {
  "SST" = ".sst/artifacts",
  "SERVERLESS" = ".build"
}
