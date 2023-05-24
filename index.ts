import { analyzeSST } from "./src/analyze-sst";
import { configHandler } from "./src/utils/config-handler";
import {
  CommandLineArgs,
  getCommandLineArg,
} from "./src/utils/get-command-line-args";

if (getCommandLineArg(CommandLineArgs.help)) {
  console.log("Help is on the way!");
  process.exit(0);
}

export const config = configHandler();
analyzeSST();
