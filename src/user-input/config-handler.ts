import fsAsync from "fs/promises";
import path from "path";
import { commandLineArgs, projectRoot } from "..";
import type { Configuration } from "../types";
import { initHandler } from ".";
import { checkFileExist } from "../utils/check-file-exist";

const extendConfigWithArgs = (config: Configuration) => {
  const newConfig = { ...config };

  return { ...newConfig, ...commandLineArgs };
};

const parseConfig = async (path: string): Promise<Configuration> => {
  const file = await fsAsync.readFile(path);
  const config = file.toString();

  return JSON.parse(config) as Configuration;
};

export const configHandler = async () => {
  const existingConfig = await getConfig();
  if (existingConfig) {
    return existingConfig;
  }
  await initHandler();

  const projectConfigPath = path.resolve(projectRoot, "sib-config.json");
  const config = await parseConfig(projectConfigPath);

  return extendConfigWithArgs(config);
};

export const getConfig = async () => {
  const filePath = path.resolve(projectRoot, "sib-config.json");
  const isFileNotExists = !(await checkFileExist(filePath));

  if (isFileNotExists || commandLineArgs.initialize) {
    return;
  }

  const projectConfigPath = path.resolve(projectRoot, "sib-config.json");
  const config = await parseConfig(projectConfigPath);

  return extendConfigWithArgs(config);
};

export const createConfigFile = async (config: Configuration) => {
  await fsAsync.writeFile(`${projectRoot}/sib-config.json`, JSON.stringify(config, null, 2));
};
