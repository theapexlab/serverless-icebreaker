import fs from "fs/promises";
import path from "path";
import { commandLineArgs, projectRoot } from "..";
import type { Configuration } from "../types";
import { initHandler } from ".";
import { existsSync } from "fs";

const extendConfigWithArgs = (config: Configuration) => {
  const newConfig = { ...config };

  return { ...newConfig, ...commandLineArgs };
};

const parseConfig = async (path: string): Promise<Configuration> => {
  const file = await fs.readFile(path);
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
  if (!existsSync(path.resolve(projectRoot, "sib-config.json")) || commandLineArgs.initialize) {
    return;
  }

  const projectConfigPath = path.resolve(projectRoot, "sib-config.json");
  const config = await parseConfig(projectConfigPath);

  return extendConfigWithArgs(config);
};

export const createConfigFile = async (config: Configuration) => {
  await fs.writeFile(`${projectRoot}/sib-config.json`, JSON.stringify(config, null, 2));
};
