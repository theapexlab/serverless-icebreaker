import { writeFileSync } from "fs";
import moment from "moment";
import type { CSTData, LambdaData } from "../types";
import { formatSizeOutput } from "../utils/format-size-output";

export const createDetailedReport = (data: CSTData) => {
  const timeStamp = moment().format("DD.MM.YY. HH:mm");

  const { acceptableLambdas, lambdasWithWarnings, lambdasWithErrors, metrics } =
    data;

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

  writeFileSync(`cst-detailed-report.json`, reportJSON);
};

const lambdaReport = (lambda: LambdaData[]) => {
  return lambda.map(item => ({
    lambdaName: item.lambdaName,
    lambdaSize: formatSizeOutput(item.lambdaSize),
    importedModules: item.importedModules,
    mostFrequentModules: item.mostFrequentModules
  }));
};

export const createReport = (output: string[]) => {
  const timeStamp = `🗓️ Date issued: ${moment().format("DD.MM.YY. HH:mm")}\n`;
  output.push(timeStamp);
  writeFileSync(`cst-report.txt`, output.reverse().join("\n"));
};
