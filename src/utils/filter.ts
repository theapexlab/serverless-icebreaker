import { config } from "../..";
import { extensions } from "./constants";

export const filterByExtension = (extension: string) =>
  extensions.includes(extension);

export const filterByNameFunc = (fileName: string): boolean =>
  fileName.startsWith(config.filterByName);
