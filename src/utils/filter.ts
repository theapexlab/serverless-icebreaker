import { config } from "../..";

export const filterByNameAndExtension = (fileName: string) =>
  fileName.startsWith(config.filterByName) && filterByExtension(fileName);

// Filter for .js and .mjs files
const filterByExtension = (fileName: string) => /\.(js|mjs)$/i.test(fileName);
