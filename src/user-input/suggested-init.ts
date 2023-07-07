import { createConfigFile } from "../utils/config-handler";
import { defaultConfig } from "../constants";
import { Messages } from "../utils/messages";
import { consentMessage } from "./consent-message";
import { FrameworkBuildPath } from "../types";

export const suggestedInit = async (framework: string) => {
  const buildPath = FrameworkBuildPath[framework as keyof typeof FrameworkBuildPath];
  defaultConfig.buildPath = buildPath;

  createConfigFile(defaultConfig);
  await consentMessage(Messages.CONFIG_CREATED);
};
