import fs from "fs";
import path from "path";
import { cstScript, cyanColor, resetColor } from "../utils/constants";

const addScript = () => {
  // Get the root directory of the project
  const projectRoot = path.resolve(__dirname, "../../../../../");

  // Read the package.json file of the project
  const projectPackageJsonPath = path.join(projectRoot, "package.json");
  const packageJson = require(projectPackageJsonPath);

  // Add the desired command to the scripts object
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.cst = cstScript;

  // Update the package.json file of the project
  fs.writeFileSync(
    projectPackageJsonPath,
    JSON.stringify(packageJson, null, 2)
  );
};

const welcomeMessage = () => {
  console.log("\nCold Start Tool installed successfully!\n");
  console.log("To use it, run the following command:\n");
  console.log(`  ${cyanColor}yarn cst${resetColor}\n`);
  console.log(
    "To see the list of available commands, run the following command:\n"
  );
  console.log(`  ${cyanColor}yarn cst --help${resetColor}\n`);
  console.log(
    `For more information, visit ${cyanColor}https://www.npmjs.com/package/cold-start-tool${resetColor}\n`
  );
};

addScript();
welcomeMessage();