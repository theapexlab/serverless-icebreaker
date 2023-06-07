import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { projectRoot } from "../..";
import { Configuration } from "../types";
import { initHandler } from "../user-input";
import { commandLineArgs } from "../..";
import { consentMessage } from "../user-input/consent-message";
import { Messages } from "./messages";

const extendConfigWithArgs = (config: Configuration) => {
  const newConfig = { ...config };

  return { ...newConfig, ...commandLineArgs };
};

const parseConfig = (path: string): Configuration => {
  return JSON.parse(readFileSync(path).toString());
};

export const configHandler = async () => {
  await initHandler();

  const projectConfigPath = path.resolve(projectRoot, "cst-config.json");
  return extendConfigWithArgs(parseConfig(projectConfigPath));
};
export const getConfig = () => {
  if (
    !existsSync(path.resolve(projectRoot, "cst-config.json")) ||
    commandLineArgs.initialize
  ) {
    return;
  }
  const projectConfigPath = path.resolve(projectRoot, "cst-config.json");
  return extendConfigWithArgs(parseConfig(projectConfigPath));
};
export const createConfigFile = (config: Configuration) => {
  writeFileSync(
    `${projectRoot}/cst-config.json`,
    JSON.stringify(config, null, 2)
  );
};
