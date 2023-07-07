import { createConfigFile } from "../utils/config-handler";
import { defaultConfig } from "../constants";
import { Messages } from "../utils/messages";
import { consentMessage } from "./consent-message";
import { FrameworkBuildPath } from "../types";

export const selectedInit = async (framework: string) => {
  const buildPath = FrameworkBuildPath[framework as keyof typeof FrameworkBuildPath];
  const config = { ...defaultConfig, buildPath };

  createConfigFile(config);
  await consentMessage(Messages.CONFIG_CREATED);
};
