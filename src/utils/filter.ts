import { BUILT_FILE_EXTENSIONS } from "../constants";

const isNotContainsIgnorePattern = (fileName: string, ignorePattern: string): boolean =>
  !ignorePattern.length || !fileName.includes(ignorePattern);

export const filterByNameExtensionAndIgnorePattern = (fileName: string, filterByName: string, ignorePattern: string) =>
  fileName.includes(filterByName) &&
  isNotContainsIgnorePattern(fileName, ignorePattern) &&
  filterByExtension(fileName, BUILT_FILE_EXTENSIONS);

export const filterByExtension = (fileName: string, extensions: string[]) => {
  const regex = new RegExp(`\\.(${extensions.join("|")})$`, "i");
  return regex.test(fileName);
};
