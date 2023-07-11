import { readdir, stat } from "fs/promises";
import path from "path";
import { filterByExtension } from "../utils/filter";

export const searchFilesRecursive = async (directoryPath: string, extensions: string[]) => {
  const result: string[] = [];
  const files = await readdir(directoryPath);
  for (const file of files) {
    const filePath = path.join(directoryPath, file);

    const fileSystemObject = await stat(filePath);

    if (fileSystemObject && fileSystemObject?.isDirectory()) {
      const nestedFiles = await searchFilesRecursive(filePath, extensions);
      result.push(...nestedFiles);
    } else if (filterByExtension(file, extensions)) {
      result.push(filePath);
    }
  }
  return result;
};
