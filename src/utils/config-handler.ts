import { readFileSync } from "fs";
import path from "path";
import { projectRoot } from "../..";
import { Configuration } from "../types";
import { getCommandLineArgs } from "./get-command-line-args";

const extendConfigWithArgs = (config: Configuration) => {
  const newConfig = { ...config };

  const commandLineArgs = getCommandLineArgs();

  return { ...newConfig, ...commandLineArgs };
};

const parseConfig = (path: string): Configuration => {
  return JSON.parse(readFileSync(path).toString());
};

export const configHandler = () => {
  const projectConfigPath = path.resolve(projectRoot, "cst-config.json");

  return extendConfigWithArgs(parseConfig(projectConfigPath));
};
