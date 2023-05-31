import { analyzeSST } from "./src/analyze-sst";
import { configHandler } from "./src/utils/config-handler";

export const projectRoot = process.cwd();
export const config = configHandler();

analyzeSST();
