import fs from "fs";
import { cstScript } from "../utils/constants";
import { getPackageJson } from "../utils/get-package-json";

const addScript = () => {
  const packageJsonPath = getPackageJson();
  if (packageJsonPath === null) return;

  const packageJson = require(packageJsonPath);

  // Add the desired command to the scripts object
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.cst = cstScript;

  // Update the package.json file of the project
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};

addScript();
