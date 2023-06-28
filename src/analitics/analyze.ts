import { readFileSync, rmSync, statSync } from "fs";

import path from "path";
import { commandLineArgs } from "..";
import { createMetrics } from "../metrics";
import { sendMetadataToMixpanel } from "../metrics/mixpanel";
import { pipelineModeOutput } from "../output";
import { type Configuration, type Metrics } from "../types";
import { configHandler } from "../utils/config-handler";
import { getFiles } from "./get-files";
import { getLambdaDetail } from "./get-lambda-details";
import { cliModeOutput } from "../output";

export const readLambdaFile = (lambdaPath: string) => readFileSync(lambdaPath);

export const getLambdaSize = (lambdaPath: string) => statSync(lambdaPath).size;

export const analyze = async () => {
  const config: Configuration = await configHandler();

  const destinationPath = `${config.buildPath}/decompressed`;

  const files: string[] = await getFiles(config, destinationPath);

  const { acceptableLambdas, lambdasWithWarnings, lambdasWithErrors } =
    getLambdaDetail(config, files);

  const metrics: Metrics = createMetrics(
    acceptableLambdas.concat(lambdasWithWarnings, lambdasWithErrors),
    config.errorThresholdMB
  );

  rmSync(path.resolve(destinationPath), { recursive: true, force: true });

  if (config.metadataOptIn) {
    await sendMetadataToMixpanel("sib-run", metrics, config);
  }

  if (!commandLineArgs.pipeline) {
    cliModeOutput(
      acceptableLambdas,
      lambdasWithWarnings,
      lambdasWithErrors,
      metrics,
      config
    );
    return;
  }

  if (lambdasWithErrors.length) {
    pipelineModeOutput(lambdasWithErrors);
  }
};
