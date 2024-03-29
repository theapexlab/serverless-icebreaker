import { resolve as pathResolve } from "path";
import { projectRoot } from "..";
import { decompressFile } from "../utils/decompress";
import { filterByNameExtensionAndIgnorePattern } from "../utils/filter";
import { Messages } from "../utils/messages";
import { searchFilesRecursive } from "./search-files-recursive";
import type { Configuration } from "../types";
import { BUILT_FILE_EXTENSIONS, COMPRESSED_FILE_EXTENSIONS } from "../constants";
import { checkFileExist } from "../utils/check-file-exist";

export const getFiles = async (config: Configuration, destinationPath: string): Promise<string[]> => {
  const filePath = pathResolve(projectRoot, config.buildPath);
  const isFileNotExists = !(await checkFileExist(filePath));

  if (isFileNotExists) {
    console.error(Messages.PATH_ERROR);
    throw new Error(Messages.PATH_ERROR);
  }
  const projectPath = pathResolve(projectRoot, config.buildPath);

  const zippedFiles = await searchFilesRecursive(projectPath, COMPRESSED_FILE_EXTENSIONS);
  if (zippedFiles.length) {
    await decompressFile(zippedFiles, destinationPath);
  }
  const builtFiles = await searchFilesRecursive(projectPath, BUILT_FILE_EXTENSIONS);

  if (!builtFiles.length) {
    throw new Error(Messages.PATH_ERROR);
  }

  const filteredBuildFiles = builtFiles.filter(file =>
    filterByNameExtensionAndIgnorePattern(file, config.filterByName, config.ignorePattern)
  );
  return filteredBuildFiles;
};
