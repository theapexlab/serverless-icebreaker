import { createConfigFile } from "../utils/config-handler";
import { defaultConfig } from "../utils/constants";
import { Messages } from "../utils/messages";
import { consentMessage } from "./consent-message";

export const defaultInit = async () => {
  createConfigFile(defaultConfig);
  await consentMessage(Messages.CONFIG_CREATED);
};
