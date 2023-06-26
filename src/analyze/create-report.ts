import { writeFileSync } from "fs";
import moment from "moment";
import type { LambdaData, Metrics } from "../types";
import { formatSizeOutput } from "../utils/format-size-output";

export const createDetailedReport = (
  acceptableLambdas: LambdaData[],
  lambdasWithWarnings: LambdaData[],
  lambdasWithErrors: LambdaData[],
  metrics: Metrics
) => {
  const timeStamp = moment().format("DD.MM.YY. HH:mm");

  const reportData = {
    timeStamp: timeStamp,
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

export const createReport = (output: string[]) => {
  const timeStamp = `🗓️ Date issued: ${moment().format("DD.MM.YY. HH:mm")}\n`;
  output.push(timeStamp);
  writeFileSync(`sib-report.txt`, output.reverse().join("\n"));
};
