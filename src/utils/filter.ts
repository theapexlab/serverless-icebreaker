export const filterByNameExtensionAndIgnorePattern = (
  fileName: string,
  filterByName: string,
  ignorePattern: string
) =>
  fileName.startsWith(filterByName) &&
  !isContainsIgnorePattern(fileName, ignorePattern) &&
  filterByExtension(fileName);

// Filter for .js and .mjs files
const filterByExtension = (fileName: string) => /\.(js|mjs)$/i.test(fileName);

const isContainsIgnorePattern = (
  fileName: string,
  ignorePattern: string
): boolean => !!ignorePattern.length && fileName.includes(ignorePattern);
