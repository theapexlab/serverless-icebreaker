import { readdirSync, statSync } from "fs";
import path from "path";
import { filterByExtension } from "../utils/filter-by-extension";

export const searchFilesRecursive = (directoryPath: string) => {
  const result: string[] = [];
  const files = readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);

    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      const nestedFiles = searchFilesRecursive(filePath);
      result.push(...nestedFiles);
    } else if (path.extname(file) === filterByExtension(file)) {
      result.push(filePath);
    }
  }
  return result;
};
