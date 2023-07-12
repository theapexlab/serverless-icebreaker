import { readFile, writeFile } from "fs/promises";
import { resolve as pathResolve } from "path";
import { projectRoot } from "..";
import type { Configuration } from "../types";
import { commandLineArgs, initHandler } from ".";
import { checkFileExist } from "../utils/check-file-exist";

const extendConfigWithArgs = (config: Configuration) => {
  const newConfig = { ...config };

  return { ...newConfig, ...commandLineArgs };
};

const parseConfig = async (path: string): Promise<Configuration> => {
  const file = await readFile(path);
  const config = file.toString();

  return JSON.parse(config) as Configuration;
};

export const configHandler = async () => {
  const existingConfig = await getConfig();
  if (existingConfig) {
    return existingConfig;
  }
  await initHandler();

  const projectConfigPath = pathResolve(projectRoot, "sib-config.json");
  const config = await parseConfig(projectConfigPath);

  return extendConfigWithArgs(config);
};

export const getConfig = async () => {
  const filePath = pathResolve(projectRoot, "sib-config.json");
  const isFileNotExists = !(await checkFileExist(filePath));

  if (isFileNotExists || commandLineArgs.initialize) {
    return;
  }

  const projectConfigPath = pathResolve(projectRoot, "sib-config.json");
  const config = await parseConfig(projectConfigPath);

  return extendConfigWithArgs(config);
};

export const createConfigFile = async (config: Configuration) => {
  await writeFile(`${projectRoot}/sib-config.json`, JSON.stringify(config, null, 2));
};
