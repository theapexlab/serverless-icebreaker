import { type LambdaData, type Metrics } from "../types";
import { generateOutput } from "./generate-output";

export const createOutput = (
  acceptableLambdas: LambdaData[],
  lambdasWithWarnings: LambdaData[],
  lambdasWithErrors: LambdaData[],
  metrics: Metrics,
  showOnlyErrors: boolean,
  errorThresholdMB: number
) => {
  return generateOutput(
    acceptableLambdas,
    lambdasWithWarnings,
    lambdasWithErrors,
    metrics,
    showOnlyErrors,
    errorThresholdMB
  );
};
