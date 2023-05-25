import { config } from "../..";

const extensions = [".js", ".mjs"];

export const filterByExtension = (extension: string) =>
  extensions.includes(extension);

export const filterByName = (fileName: string): boolean =>
  config.name ? fileName.startsWith(config.name) : true;
