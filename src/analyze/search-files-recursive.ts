import { readdirSync, statSync } from "fs";
import path from "path";
import { filterByNameExtensionAndIgnorePattern } from "../utils/filter";

export const searchFilesRecursive = (
  directoryPath: string,
  filterByName: string,
  ignorePatterns: string
) => {
  const result: string[] = [];
  const files = readdirSync(directoryPath);
  for (const file of files) {
    const filePath = path.join(directoryPath, file);

    let stats;
    try {
      stats = statSync(filePath);
    } catch (e) {
      continue;
    }

    if (stats?.isDirectory()) {
      const nestedFiles = searchFilesRecursive(
        filePath,
        filterByName,
        ignorePatterns
      );
      result.push(...nestedFiles);
    } else if (
      filterByNameExtensionAndIgnorePattern(file, filterByName, ignorePatterns)
    ) {
      result.push(filePath);
    }
  }
  return result;
};
