export const filterByNameAndExtension = (
  fileName: string,
  filterByName: string
) => fileName.startsWith(filterByName) && filterByExtension(fileName);

// Filter for .js and .mjs files
const filterByExtension = (fileName: string) => /\.(js|mjs)$/i.test(fileName);
