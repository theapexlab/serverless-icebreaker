export const filterByNameExtensionAndIgnorePattern = (
  fileName: string,
  filterByName: string,
  ignorePattern: string
) =>
  fileName.includes(filterByName) &&
  !isContainsIgnorePattern(fileName, ignorePattern) &&
  filterByExtension(fileName, ["js", "mjs"]);

export const filterByExtension = (fileName: string, extensions: string[]) => {
  const regex = new RegExp(`\\.(${extensions.join("|")})$`, "i");
  return regex.test(fileName);
};

const isContainsIgnorePattern = (
  fileName: string,
  ignorePattern: string
): boolean => !!ignorePattern.length && fileName.includes(ignorePattern);
