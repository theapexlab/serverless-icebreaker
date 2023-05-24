import { existsSync, readFileSync } from "fs";
import { Configuration } from "../types";

const config = existsSync("cst-config.js");

export const configHandler = (): Configuration => {
  let configPath;
  if (config) {
    configPath = "../../../cst-config.json";
  } else {
    configPath = "cst-config.json";
  }

  return JSON.parse(readFileSync(configPath).toString());
};
