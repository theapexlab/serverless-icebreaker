import { existsSync, readFileSync } from "fs";
import { Configuration } from "../types";
import path from "path";
import { CommandLineArgs, getCommandLineArg } from "./get-command-line-args";

const extendConfigWithArgs = (config: Configuration): Configuration => {
  const newConfig = { ...config };

  const name = getCommandLineArg(CommandLineArgs.name);
  const showOnlyErrors = getCommandLineArg(CommandLineArgs.showOnlyErrors);
  const fileSize = getCommandLineArg(CommandLineArgs.fileSize);

  name && (newConfig.name = name);
  showOnlyErrors
    ? (newConfig.showOnlyErrors = true)
    : (newConfig.showOnlyErrors = false);
  fileSize && (newConfig.warningTreshold = parseInt(fileSize));

  return newConfig;
};

const parseConfig = (path: string): Configuration => {
  return JSON.parse(readFileSync(path).toString());
};

export const configHandler = (): Configuration => {
  const projectConfigPath = path.resolve(process.cwd(), "cst-config.json");

  return existsSync(projectConfigPath)
    ? extendConfigWithArgs(parseConfig(projectConfigPath))
    : extendConfigWithArgs(parseConfig("cst-config.json"));
};
