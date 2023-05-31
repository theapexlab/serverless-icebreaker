import fs from "fs";
import { getPackageJson } from "../utils/get-package-json";

const removeScript = () => {
  const packageJsonPath = getPackageJson();
  if (packageJsonPath === null) return;

  // Read the package.json file
  const packageJson = require(packageJsonPath);

  // Remove the script entry
  delete packageJson.scripts.cst;

  // Write the updated package.json file
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};

removeScript();
