import { writeFileSync } from "fs";
import { LambdaData, Metrics } from "../types";
import moment from "moment";

export const createDetailedReport = (
  acceptableLambdas: LambdaData[],
  lambdasWithWarnings: LambdaData[],
  metrics: Metrics
) => {
  const timeStamp = moment().format("DD.MM.YY. HH:mm");

  const reportData = {
    timeStamp: timeStamp,
    metrics: metrics,
    lambdasWithWarnings: lambdasWithWarnings.map((item) => ({
      lambdaName: item.lambdaName,
      lambdaSize: item.lambdaSize,
      importedModules: item.importedModules,
      mostFrequentModules: item.mostFrequentModules,
    })),
    acceptableLambdas: acceptableLambdas.map((item) => ({
      lambdaName: item.lambdaName,
      lambdaSize: item.lambdaSize,
      importedModules: item.importedModules,
      mostFrequentModules: item.mostFrequentModules,
    })),
  };

  const reportJSON = JSON.stringify(reportData, null, 2);

  writeFileSync(`cst-detailed-report.json`, reportJSON);
};

export const createReport = (output: string[]) => {
  const timeStamp = `🗓️ Date issued: ${moment().format("DD.MM.YY. HH:mm")}\n`;
  output.push(timeStamp);
  writeFileSync(`cst-report.txt`, output.reverse().join("\n"));
};
