import fs from "fs";
import path from "path";

// Get the root directory of the project
const projectRoot = path.resolve(__dirname, "../../");

// Path to the package.json file
const packageJsonPath = path.resolve(projectRoot, "package.json");

// Read the package.json file
const packageJson = require(packageJsonPath);

// Remove the script entry
delete packageJson.scripts.cst;

// Write the updated package.json file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
