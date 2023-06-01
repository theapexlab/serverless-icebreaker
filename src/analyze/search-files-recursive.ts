import { readdirSync, statSync } from "fs";
import path from "path";
import { filterByNameAndExtension } from "../utils/filter";

export const searchFilesRecursive = (directoryPath: string) => {
  const result: string[] = [];
  const files = readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);

    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      const nestedFiles = searchFilesRecursive(filePath);
      result.push(...nestedFiles);
    } else if (filterByNameAndExtension(file)) {
      result.push(filePath);
    }
  }
  return result;
};
