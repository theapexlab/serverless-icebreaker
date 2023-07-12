import { rm } from "fs/promises";
import path from "path";
import { createMetrics } from "../metrics";
import { sendMetadataToMixpanel } from "../metrics/mixpanel";
import { cliModeOutput, pipelineModeOutput } from "../output";
import { type Configuration, type Metrics } from "../types";
import { configHandler } from "../user-input/config-handler";
import { getFiles } from "./get-files";
import { getLambdaDetail } from "./get-lambda-details";
import { MIXPANEL_COLLECTION_NAME } from "../constants";
import { commandLineArgs } from "../user-input";

export const analyze = async () => {
  const config: Configuration = await configHandler();

  const destinationPath = `${config.buildPath}/decompressed`;

  const files: string[] = await getFiles(config, destinationPath);

  const { acceptableLambdas, lambdasWithWarnings, lambdasWithErrors } = await getLambdaDetail(config, files);

  const metrics: Metrics = createMetrics(
    acceptableLambdas.concat(lambdasWithWarnings, lambdasWithErrors),
    config.errorThresholdMB
  );

  await rm(path.resolve(destinationPath), { recursive: true, force: true });

  if (config.metadataOptIn) {
    await sendMetadataToMixpanel(MIXPANEL_COLLECTION_NAME, metrics, config);
  }

  if (!commandLineArgs.pipeline) {
    await cliModeOutput(acceptableLambdas, lambdasWithWarnings, lambdasWithErrors, metrics, config);
    return;
  }

  if (lambdasWithErrors.length) {
    pipelineModeOutput(lambdasWithErrors);
  }
};
