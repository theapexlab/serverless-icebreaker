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

const parseConfig = (path: string): Configuration => {
  return JSON.parse(fs.readFile(path).toString()) as Configuration;
};

export const configHandler = async () => {
  const existingConfig = getConfig();
  if (existingConfig) {
    return existingConfig;
  }
  await initHandler();

  const projectConfigPath = path.resolve(projectRoot, "sib-config.json");
  return extendConfigWithArgs(parseConfig(projectConfigPath));
};

export const getConfig = () => {
  if (!existsSync(path.resolve(projectRoot, "sib-config.json")) || commandLineArgs.initialize) {
    return;
  }
  const projectConfigPath = path.resolve(projectRoot, "sib-config.json");
  return extendConfigWithArgs(parseConfig(projectConfigPath));
};

export const createConfigFile = async (config: Configuration) => {
  await fs.writeFile(`${projectRoot}/sib-config.json`, JSON.stringify(config, null, 2));
};
