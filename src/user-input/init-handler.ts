import { suggestedInit } from "./suggested-init";
import { init } from "./init";
import { getInitialAnswer } from "./get-initial-answer";
import { ConfigurationMethod } from "../types";

const isSuggestedInit = (init: string) => init !== ConfigurationMethod.CUSTOM;

const findConfigurationMethodKeyByValue = (value: string) => {
  const enumKeys = Object.keys(ConfigurationMethod);
  const key = enumKeys.find(key => ConfigurationMethod[key as keyof typeof ConfigurationMethod] === value);
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
