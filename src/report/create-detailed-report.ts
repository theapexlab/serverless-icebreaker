import { writeFileSync } from "fs";
import { DateTime } from "luxon";
import { LambdaData, Metrics } from "../types";
import { formatSizeOutput } from "../utils/format-size-output";

const timeStamp = DateTime.now().toFormat("dd.MM.yy. HH:mm");

export const createDetailedReport = (
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

  writeFileSync(`sib-detailed-report.json`, reportJSON);
};

const lambdaReport = (lambda: LambdaData[]) => {
  return lambda.map(item => ({
    lambdaName: item.lambdaName,
    possibleColdStartDuration: `~${item.possibleColdStartDuration} ms`,
    lambdaSize: formatSizeOutput(item.lambdaSize),
    importedModules: item.importedModules,
    mostFrequentModules: item.mostFrequentModules
  }));
};
