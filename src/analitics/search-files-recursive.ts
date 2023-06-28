import { existsSync, readdirSync, statSync } from "fs";
import path from "path";
import { filterByExtension } from "../utils/filter";

export const searchFilesRecursive = (
  directoryPath: string,
  extensions: string[]
) => {
  const result: string[] = [];
  const files = readdirSync(directoryPath);
  for (const file of files) {
    const filePath = path.join(directoryPath, file);

    const fileSystemObject = existsSync(filePath) && statSync(filePath);

    if (fileSystemObject && fileSystemObject?.isDirectory()) {
      const nestedFiles = searchFilesRecursive(filePath, extensions);
      result.push(...nestedFiles);
    } else if (filterByExtension(file, extensions)) {
      result.push(filePath);
    }
  }
  return result;
};
