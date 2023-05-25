import fs from "fs";
import path from "path";

const cstScript = "npx ts-node ./node_modules/cold-start-tool";

export const addScript = () => {
  // Get the root directory of the project
  const projectRoot = path.resolve(__dirname, "../../");

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
