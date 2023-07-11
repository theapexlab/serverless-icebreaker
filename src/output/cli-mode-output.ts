import { generateReport } from "../report";
import type { Configuration, LambdaData, Metrics } from "../types";
import { generateOutput } from "./generate-output";

export const cliModeOutput = async (
  acceptableLambdas: LambdaData[],
  lambdasWithWarnings: LambdaData[],
  lambdasWithErrors: LambdaData[],
  metrics: Metrics,
  config: Configuration
) => {
  const output = generateOutput(
    acceptableLambdas,
    lambdasWithWarnings,
    lambdasWithErrors,
    metrics,
    config.showOnlyErrors,
    config.errorThresholdMB
  );

  console.info(output.join("\n"));

  await generateReport(config, output, acceptableLambdas, lambdasWithWarnings, lambdasWithErrors, metrics);
};
