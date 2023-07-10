import type { Configuration, LambdaData, Metrics } from "../types";
import { createDetailedReport } from "./create-detailed-report";
import { createReport } from "./create-report";

export const generateReport = async (
  config: Configuration,
  output: string[],
  acceptableLambdas: LambdaData[],
  lambdasWithWarnings: LambdaData[],
  lambdasWithErrors: LambdaData[],
  metrics: Metrics
) => {
  if (!config.detailedReport) {
    await createReport(output);
  } else {
    await createDetailedReport(acceptableLambdas, lambdasWithWarnings, lambdasWithErrors, metrics);
  }
};
