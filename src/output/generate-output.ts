import { getMetrics } from "../metrics/get-metrics";
import { OutputTypes } from "../types";
import type { LambdaData, Metrics } from "../types";
import { getOutputMessage } from "./get-output-message";

export const generateOutput = (
  acceptableLambdas: LambdaData[],
  lambdasWithWarnings: LambdaData[],
  lambdasWithErrors: LambdaData[],
  metrics: Metrics,
  showOnlyErrors: boolean,
  errorThresholdMB: number
) => {
  const output: string[] = [];
  if (!showOnlyErrors) {
    acceptableLambdas.forEach(module => {
      output.push(getOutputMessage(module, OutputTypes.SUCCESS));
    });
  }
  lambdasWithWarnings.forEach(module => {
    output.push(getOutputMessage(module, OutputTypes.WARNING));
  });
  lambdasWithErrors.forEach(module => {
    output.push(getOutputMessage(module, OutputTypes.ERROR));
  });

  output.push(getMetrics(metrics, errorThresholdMB));
  return output;
};
