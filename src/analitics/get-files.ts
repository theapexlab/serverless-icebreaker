import { existsSync } from "fs";
import path from "path";
import { projectRoot } from "..";
import { decompressFile } from "../utils/decompress";
import { filterByNameExtensionAndIgnorePattern } from "../utils/filter";
import { Messages } from "../utils/messages";
import { searchFilesRecursive } from "./search-files-recursive";
import type { Configuration } from "../types";
import { BUILT_FILE_EXTENSIONS, COMPRESSED_FILE_EXTENSIONS } from "../constants";

export const getFiles = async (config: Configuration, destinationPath: string): Promise<string[]> => {
  if (!existsSync(path.resolve(projectRoot, config.buildPath))) {
    console.error(Messages.PATH_ERROR);
    throw new Error(Messages.PATH_ERROR);
  }
  const projectPath = path.resolve(projectRoot, config.buildPath);

  const zippedFiles = searchFilesRecursive(projectPath, COMPRESSED_FILE_EXTENSIONS);
  if (zippedFiles.length) {
    await decompressFile(zippedFiles, destinationPath);
  }
  const builtFiles = searchFilesRecursive(projectPath, BUILT_FILE_EXTENSIONS);

  if (!builtFiles.length) {
    throw new Error(Messages.PATH_ERROR);
  }

  const filteredBuildFiles = builtFiles.filter(file =>
    filterByNameExtensionAndIgnorePattern(file, config.filterByName, config.ignorePattern)
  );
  return filteredBuildFiles;
};
