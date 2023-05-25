import { config } from "../..";
import { extensions } from "./constants";

export const filterByExtension = (extension: string) =>
  extensions.includes(extension);

export const filterByName = (fileName: string): boolean =>
  config.name ? fileName.startsWith(config.name) : true;
