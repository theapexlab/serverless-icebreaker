import path from "path";
import { sstFolderPath } from "../consts";
import { readFileSync, readdirSync, statSync } from "fs";
import { filterByExtension } from "./filter-by-extension";

export const getArtifactsSubfolders = () =>
  readdirSync(sstFolderPath, { withFileTypes: true }).filter((file) =>
    file.isDirectory()
  );

export const getSubfolderPath = (subfolderName: string) =>
  path.join(sstFolderPath, subfolderName, "packages/functions/src");

export const getLambdaFilePath = (subfolderPath: string) =>
  readdirSync(subfolderPath).filter((file) => filterByExtension(file))[0];

export const readLambdaFile = (lambdaPath: string, lambdaFile: string) =>
  readFileSync(path.join(lambdaPath, lambdaFile));

export const getLambdaSize = (lambdaPath: string, lambdaFile: string) =>
  statSync(path.join(lambdaPath, lambdaFile)).size;
