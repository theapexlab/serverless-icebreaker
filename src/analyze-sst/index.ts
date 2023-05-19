import fs, { stat } from "fs";
import path from "path";
import { sstFolderPath } from "../consts";
import { getNodeModulesData } from "./get-node-modules-data";

export const analyzeSST = () =>
  fs.readdir(sstFolderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return;
    }

    const subfolders = files.filter((file) => file.isDirectory());

    subfolders.forEach((subfolder) => {
      const subfolderPath = path.join(
        sstFolderPath,
        subfolder.name,
        "packages/functions/src"
      );

      fs.readdir(subfolderPath, (err, files) => {
        if (err) {
          console.error("Error reading subfolder:", err);
          return;
        }

        const mjsFiles = files.filter((file) => file.endsWith(".mjs"));

        stat(path.join(subfolderPath, mjsFiles[0]), (err, stats) => {
          if (err) {
            console.error("Error getting subfolder stats:", err);
            return;
          }

          fs.readFile(path.join(subfolderPath, mjsFiles[0]), (err, data) => {
            if (err) {
              console.error("Error reading file:", err);
              return;
            }
            const lambda = mjsFiles.join(", ");
            getNodeModulesData(data.toString(), lambda, stats.size);
          });
        });
      });
    });
  });
