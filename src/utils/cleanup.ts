import { existsSync, unlinkSync } from "fs";
import { projectRoot } from "..";

const configFilePath = `${projectRoot}/sib-config.json`;
const reportFilePath = `${projectRoot}/sib-report.txt`;
const detailedReportFilePath = `${projectRoot}/sib-detailed-report.json`;
try {
  if (existsSync(configFilePath)) {
    unlinkSync(configFilePath);
  }
  if (existsSync(reportFilePath)) {
    unlinkSync(reportFilePath);
  }
  if (existsSync(detailedReportFilePath)) {
    unlinkSync(detailedReportFilePath);
  }
} catch (err) {
  process.exit(1);
}
