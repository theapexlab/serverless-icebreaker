import { suggestedInit } from "./suggested-init";
import { init } from "./init";
import { getInitialAnswer } from "./get-initial-answer";
import { ConfigurationOption } from "../types";

const isSuggestedInit = (init: string) => init !== ConfigurationOption.CUSTOM;

const findConfigurationMethodKeyByValue = (value: string) => {
  const enumKeys = Object.keys(ConfigurationOption);
  const key = enumKeys.find(key => ConfigurationOption[key as keyof typeof ConfigurationOption] === value);
  return key || enumKeys[0];
};

export const initHandler = async () => {
  const initialAnswer = await getInitialAnswer();
  const isSuggested = isSuggestedInit(initialAnswer);

  if (isSuggested) {
    const framework = findConfigurationMethodKeyByValue(initialAnswer);
    return await suggestedInit(framework);
  }

  return await init();
};
