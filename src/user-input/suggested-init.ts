import { createConfigFile } from "../utils/config-handler";
import { defaultConfig } from "../constants";
import { Messages } from "../utils/messages";
import { consentMessage } from "./consent-message";
import { FrameworksBuildPath } from "../types";

export const suggestedInit = async (framework: string) => {
  const buildPath = FrameworksBuildPath[framework as keyof typeof FrameworksBuildPath];
  defaultConfig.buildPath = buildPath;

  createConfigFile(defaultConfig);
  await consentMessage(Messages.CONFIG_CREATED);
};
