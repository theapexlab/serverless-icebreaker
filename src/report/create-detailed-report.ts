import { writeFile } from "fs/promises";
import { DateTime } from "luxon";
import type { LambdaData, Metrics } from "../types";
import { formatSizeOutput } from "../utils/format-size-output";
import { DETAILED_REPORT_FILE_NAME } from "../constants";

const timeStamp = DateTime.now().toFormat("dd.MM.yy. HH:mm");

export const createDetailedReport = async (
  acceptableLambdas: LambdaData[],
  lambdasWithWarnings: LambdaData[],
  lambdasWithErrors: LambdaData[],
  metrics: Metrics
) => {
  const reportData = {
    timeStamp,
    metrics: {
      numberOfLambdas: metrics.numberOfLambdas,
      averageLambdaSize: formatSizeOutput(metrics.averageLambdaSize),
      largestLambdaSize: formatSizeOutput(metrics.largestLambdaSize),
      smallestLambdaSize: formatSizeOutput(metrics.smallestLambdaSize)
    },

    lambdasWithErrors: lambdaReport(lambdasWithErrors),
    lambdasWithWarnings: lambdaReport(lambdasWithWarnings),
    acceptableLambdas: lambdaReport(acceptableLambdas)
  };

  const reportJSON = JSON.stringify(reportData, null, 2);

  await writeFile(DETAILED_REPORT_FILE_NAME, reportJSON);
};

const lambdaReport = (lambda: LambdaData[]) => {
  return lambda.map(item => ({
    lambdaName: item.name,
    possibleColdStartDuration: `~${item.possibleColdStartDuration} ms`,
    lambdaSize: formatSizeOutput(item.size),
    importedModules: item.importedModules,
    mostFrequentModules: item.mostFrequentModules
  }));
};
