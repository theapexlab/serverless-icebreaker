import inquirer from "inquirer";
import type { Configuration } from "../types";
import { createConfigFile } from "../utils/config-handler";
import { defaultConfig } from "../utils/constants";
import { Messages } from "../utils/messages";
import { consentMessage } from "./consent-message";
import { initialConfigChoices, initialQuestion, questions } from "./questions";

export const isDefaultInit = async (): Promise<boolean> => {
  const inititalAnswer = await inquirer.prompt(initialQuestion);

  return inititalAnswer.init === initialConfigChoices[0];
};

export const defaultInit = async () => {
  createConfigFile(defaultConfig);
  await consentMessage(Messages.CONFIG_CREATED);
};

export const init = async () => {
  const answers = await inquirer.prompt(questions);
  createConfigFile(answers as Configuration);
  await consentMessage(Messages.CONFIG_CREATED);
};

export const initHandler = async () => {
  const isDefault = await isDefaultInit();
  if (isDefault) {
    return await defaultInit();
  }
  return await init();
};
