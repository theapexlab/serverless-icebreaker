import { readdirSync, statSync } from "fs";
import path from "path";
import { filterByExtension, filterByName } from "../utils/filter";

export const searchFilesRecursive = (directoryPath: string) => {
  const result: string[] = [];
  const files = readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);

    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      const nestedFiles = searchFilesRecursive(filePath);
      result.push(...nestedFiles);
    } else if (filterByExtension(path.extname(file)) && filterByName(file)) {
      result.push(filePath);
    }
  }
  return result;
};
