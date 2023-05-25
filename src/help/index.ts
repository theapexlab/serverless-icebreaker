import { CommandLineArgs } from "../utils/get-command-line-args";

export const showHelp = () => {
  const name = CommandLineArgs.name;
  const fileSize = CommandLineArgs.fileSize;
  const showOnlyErrors = CommandLineArgs.showOnlyErrors;

  console.log("\nCold start tool - CST");
  console.log("Help is on the way! \n");
  console.log(`Description: \n
  This tool will help you to find the lambda functions that are too big and can be optimized. 
  Must have the local build of the lambdas before using this tool.\n`);
  console.log(`Usage: yarn cst [options] \n`);
  console.log(`Parameters: \n`);
  console.log(`  --${name}: filter by lambda name (startWith / string)\n
  --${fileSize}: overwrite the default warning threshold size (number MB)\n
  --${showOnlyErrors}: show only errors (boolean)\n
  --${CommandLineArgs.help}:  Show this help (boolean)\n`);
  console.log(`Examples: \n`);
  console.log(`  yarn cst\n
  yarn cst --${name}=get\n
  yarn cst --${name}=get --${fileSize}=30\n
  yarn cst --${name}=get --${fileSize}=30 --${showOnlyErrors}\n`);
  process.exit(0);
};
