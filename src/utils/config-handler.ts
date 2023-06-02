import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { projectRoot } from "../..";
import { Configuration } from "../types";
import { getCommandLineArgs } from "./get-command-line-args";
import { defaultConfig } from "./constants";

const extendConfigWithArgs = (config: Configuration) => {
  const newConfig = { ...config };

  const commandLineArgs = getCommandLineArgs();

  return { ...newConfig, ...commandLineArgs };
};

const parseConfig = (path: string): Configuration => {
  return JSON.parse(readFileSync(path).toString());
};

export const configHandler = () => {
  if (!existsSync(path.resolve(projectRoot, "cst-config.json"))) {
    createConfigFile();
  }
  const projectConfigPath = path.resolve(projectRoot, "cst-config.json");

  return extendConfigWithArgs(parseConfig(projectConfigPath));
};

const createConfigFile = () => {
  writeFileSync(
    `${projectRoot}/cst-config.json`,
    JSON.stringify(defaultConfig, null, 2)
  );
};
