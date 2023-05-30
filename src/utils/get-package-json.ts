import { existsSync } from "fs";
import path from "path";

export const getPackageJson = () => {
  const projectRoot = process.cwd();

  const packageJsonPath = path.resolve(projectRoot, "package.json");

  if (!existsSync(packageJsonPath)) {
    console.log(
      "\nError: package.json file not found in the project root directory."
    );
    return null;
  }
  return packageJsonPath;
};
