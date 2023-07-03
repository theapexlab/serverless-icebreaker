import { suggestedInit } from "./suggested-init";
import { init } from "./init";
import { isSuggestedInit } from "./is-suggested-init";

export const initHandler = async () => {
  const { isSuggested, framework } = await isSuggestedInit();
  if (isSuggested) {
    return await suggestedInit(framework);
  }
  return await init();
};
