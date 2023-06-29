import { BUILT_FILE_EXTENSIONS } from "./constants";

export const filterByNameExtensionAndIgnorePattern = (
  fileName: string,
  filterByName: string,
  ignorePattern: string
) =>
  fileName.includes(filterByName) &&
  !isContainsIgnorePattern(fileName, ignorePattern) &&
  filterByExtension(fileName, BUILT_FILE_EXTENSIONS);

export const filterByExtension = (fileName: string, extensions: string[]) => {
  const regex = new RegExp(`\\.(${extensions.join("|")})$`, "i");
  return regex.test(fileName);
};

const isContainsIgnorePattern = (
  fileName: string,
  ignorePattern: string
): boolean => !!ignorePattern.length && fileName.includes(ignorePattern);
