import { CommandLineArgs } from "../utils/get-command-line-args";

export const showHelp = () => {
  console.log("Help is on the way! \n");
  console.log(`Command line parameters: \n`);
  console.log(`  --${CommandLineArgs.name}: filter by lambda name (startWith / string)\n
  --${CommandLineArgs.fileSize}: overwrite the default warning threshold size (number MB)\n
  --${CommandLineArgs.showOnlyErrors}: show only errors (boolean)\n
  --${CommandLineArgs.help}:  Show this help (boolean)\n`);
  process.exit(0);
};
