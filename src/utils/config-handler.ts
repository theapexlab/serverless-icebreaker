import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { projectRoot } from "../..";
import { Configuration } from "../types";
import { getCommandLineArgs } from "./get-command-line-args";
import { defaultConfig, warningPercentage } from "./constants";

const extendConfigWithArgs = (
  config: Configuration
): Configuration & { nearToWarningThresholdMB: number } => {
  const newConfig = { ...config };

  const commandLineArgs = getCommandLineArgs();

  const nearToWarningThresholdMB = newConfig.warningThresholdMB
    ? newConfig.warningThresholdMB * (1 - warningPercentage / 100)
    : 0;

  return { ...newConfig, ...commandLineArgs, nearToWarningThresholdMB };
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
