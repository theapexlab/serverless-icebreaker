import inquirer from "inquirer";
import { initialQuestion } from "./questions";
import { ConfigurationMethods } from "../types";
import { Messages } from "../utils/messages";

const findConfigurationMethodKeyByValue = (value: string) => {
  return Object.keys(ConfigurationMethods).find(
    key => ConfigurationMethods[key as keyof typeof ConfigurationMethods] === value
  );
};

export const isSuggestedInit = async (): Promise<{ isSuggested: boolean; framework: string }> => {
  const initialAnswer = await inquirer.prompt(initialQuestion);

  const isSuggested = initialAnswer.init !== ConfigurationMethods.CUSTOM;
  const framework = findConfigurationMethodKeyByValue(initialAnswer.init as string);

  if (!framework) {
    throw new Error(`${Messages.INITIAL_ANSWER} ${initialAnswer.init as string}`);
  }

  return { isSuggested, framework };
};
