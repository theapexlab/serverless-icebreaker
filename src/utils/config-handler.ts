import { existsSync, readFileSync } from "fs";
import { Configuration } from "../types";
import path from "path";
import { CommandLineArgs, getCommandLineArg } from "./get-command-line-args";
import { projectRoot } from "../..";

const extendConfigWithArgs = (config: Configuration): Configuration => {
  const newConfig = { ...config };

  const filterByName = getCommandLineArg(CommandLineArgs.filterByName);
  const showOnlyErrors = getCommandLineArg(CommandLineArgs.showOnlyErrors);
  const warningTreshold = getCommandLineArg(CommandLineArgs.warningTreshold);

  filterByName && (newConfig.filterByName = filterByName);
  showOnlyErrors && (newConfig.showOnlyErrors = true);
  warningTreshold && (newConfig.warningTreshold = parseInt(warningTreshold));

  return newConfig;
};

const parseConfig = (path: string): Configuration => {
  return JSON.parse(readFileSync(path).toString());
};

export const configHandler = (): Configuration => {
  const projectConfigPath = path.resolve(projectRoot, "cst-config.json");

  return existsSync(projectConfigPath)
    ? extendConfigWithArgs(parseConfig(projectConfigPath))
    : extendConfigWithArgs(parseConfig("cst-config.json"));
};
