import { defaultInit } from "./default-init";
import { init } from "./init";
import { isDefaultInit } from "./is-default-init";

export const initHandler = async () => {
  const isDefault = await isDefaultInit();
  if (isDefault) {
    return await defaultInit();
  }
  return await init();
};
