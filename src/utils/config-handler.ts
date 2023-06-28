import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { commandLineArgs, projectRoot } from "..";
import type { Configuration } from "../types";
import { initHandler } from "../user-input";

const extendConfigWithArgs = (config: Configuration) => {
  const newConfig = { ...config };

  return { ...newConfig, ...commandLineArgs };
};

const parseConfig = (path: string): Configuration => {
  return JSON.parse(readFileSync(path).toString()) as Configuration;
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
  if (
    !existsSync(path.resolve(projectRoot, "sib-config.json")) ||
    commandLineArgs.initialize
  ) {
    return;
  }
  const projectConfigPath = path.resolve(projectRoot, "sib-config.json");
  return extendConfigWithArgs(parseConfig(projectConfigPath));
};

export const createConfigFile = (config: Configuration) => {
  writeFileSync(
    `${projectRoot}/sib-config.json`,
    JSON.stringify(config, null, 2)
  );
};
