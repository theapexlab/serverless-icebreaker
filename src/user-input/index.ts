import inquirer from "inquirer";
import type { Configuration } from "../types";
import { createConfigFile } from "../utils/config-handler";
import { defaultConfig } from "../utils/constants";
import { consentMessage } from "./consent-message";
import { initialQuestion, questions } from "./questions";

export const isDefaultInit = async (): Promise<boolean> => {
  const inititalAnswer = await inquirer.prompt(initialQuestion);
  return inititalAnswer.init === "Continue with default SST app";
};

export const defaultInit = async () => {
  createConfigFile(defaultConfig);
  await consentMessage(
    "Default config file created, you can find and modify it in the root of your project, or use the --init command.\nPress any key to continue..."
  );
};

export const init = async () => {
  const answers = await inquirer.prompt(questions);
  createConfigFile(answers as Configuration);
};

export const initHandler = async () => {
  const isDefault = await isDefaultInit();
  if (isDefault) {
    return await defaultInit();
  }
  return await init();
};
