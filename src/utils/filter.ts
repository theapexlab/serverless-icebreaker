import { config } from "../..";

export const filterByNameAndExtension = (fileName: string) =>
  fileName.startsWith(config.filterByName) && /\.(js|mjs)$/i.test(fileName);
