import type { Configuration, LambdaData, Metrics } from "../types";
import { createDetailedReport } from "./create-detailed-report";
import { createReport } from "./create-report";

export const generateReport = (
  config: Configuration,
  output: string[],
  acceptableLambdas: LambdaData[],
  lambdasWithWarnings: LambdaData[],
  lambdasWithErrors: LambdaData[],
  metrics: Metrics
) => {
  if (!config.detailedReport) {
    createReport(output);
  } else {
    createDetailedReport(acceptableLambdas, lambdasWithWarnings, lambdasWithErrors, metrics);
  }
};
