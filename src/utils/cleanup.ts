import fs from "fs/promises";
import { existsSync } from "fs";
import { projectRoot } from "..";

const removeFileIfExists = async (filePath: string) => {
  if (existsSync(filePath)) {
    await fs.unlink(filePath);
  }
};

const cleanUpFiles = async () => {
  const configFilePath = `${projectRoot}/sib-config.json`;
  const reportFilePath = `${projectRoot}/sib-report.txt`;
  const detailedReportFilePath = `${projectRoot}/sib-detailed-report.json`;

  await removeFileIfExists(configFilePath);
  await removeFileIfExists(reportFilePath);
  await removeFileIfExists(detailedReportFilePath);
};

void cleanUpFiles();
