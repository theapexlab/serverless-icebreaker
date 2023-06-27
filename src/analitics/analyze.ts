import { readFileSync, rmSync, statSync } from "fs";

import path from "path";
import { commandLineArgs } from "..";
import { sendMetadataToMixpanel } from "../metrics/mixpanel";
import { createOutput } from "../output";
import { pipelineModeOutput } from "../output/pipeline-mode-output";
import { generateReport } from "../report";
import { type Configuration, type Metrics } from "../types";
import { configHandler } from "../utils/config-handler";
import { createMetrics } from "./create-metrics";
import { getFiles } from "./get-files";
import { getLambdaDetail } from "./get-lambda-details";

export const readLambdaFile = (lambdaPath: string) => readFileSync(lambdaPath);

export const getLambdaSize = (lambdaPath: string) => statSync(lambdaPath).size;

export const analyze = async () => {
  //setup config
  const config: Configuration = await configHandler();

  //decompres destination
  const destinationPath = `${config.buildPath}/decompressed`;

  //get files
  const files: string[] = await getFiles(config, destinationPath);

  //get lambda details
  const { acceptableLambdas, lambdasWithWarnings, lambdasWithErrors } =
    getLambdaDetail(config, files);

  //create metrics
  const metrics: Metrics = createMetrics(
    acceptableLambdas.concat(lambdasWithWarnings, lambdasWithErrors),
    config.errorThresholdMB
  );
  // cleanup
  rmSync(path.resolve(destinationPath), { recursive: true, force: true });

  if (config.metadataOptIn) {
    await sendMetadataToMixpanel("sib-run", metrics, config);
  }

  if (!commandLineArgs.pipeline) {
    //gather output
    const output = createOutput(
      acceptableLambdas,
      lambdasWithWarnings,
      lambdasWithErrors,
      metrics,
      config.showOnlyErrors,
      config.errorThresholdMB
    );
    //print output
    console.info(output.join("\n"));
    //generate report
    generateReport(
      config,
      output,
      acceptableLambdas,
      lambdasWithWarnings,
      lambdasWithErrors,
      metrics
    );
    return;
  }

  // pipelinemode output
  if (lambdasWithErrors.length) {
    pipelineModeOutput(lambdasWithErrors);
  }
};
