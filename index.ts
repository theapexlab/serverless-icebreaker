import { analyzeSST } from "./src/analyze-sst";
import { showHelp } from "./src/help";
import { configHandler } from "./src/utils/config-handler";
import {
  CommandLineArgs,
  getCommandLineArg,
} from "./src/utils/get-command-line-args";

getCommandLineArg(CommandLineArgs.help) && showHelp();

export const config = configHandler();
analyzeSST();
