import fs from "fs/promises";
import { projectRoot } from "..";
import { checkFileExist } from "./check-file-exist";

const removeFileIfExists = async (filePath: string) => {
  const isFileExists = await checkFileExist(filePath);

  if (isFileExists) {
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
