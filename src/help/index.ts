import { cyanColor, resetColor } from "../utils/constants";
import { CommandLineArgs } from "../utils/get-command-line-args";

export const showHelp = () => {
  const filterByName = CommandLineArgs.filterByName;
  const warningTreshold = CommandLineArgs.warningTreshold;
  const showOnlyErrors = CommandLineArgs.showOnlyErrors;

  console.log("\nCold start tool - CST");
  console.log("Help is on the way! \n");
  console.log(`Description: \n
  This tool will help you to find the lambda functions that are too big and can be optimized. 
  Must have the local build of the lambdas before using this tool.\n`);
  console.log(`Usage: yarn cst [options] \n`);
  console.log(`Parameters: \n`);
  console.log(`  ${cyanColor}--${filterByName}${resetColor}: filter by lambda filterByName (startWith / string)
  ${cyanColor}--${warningTreshold}${resetColor}: overwrite the default warning threshold size (number MB)
  ${cyanColor}--${showOnlyErrors}${resetColor}: show only errors (boolean)
  ${cyanColor}--${CommandLineArgs.help}${resetColor}:  Show this help (boolean)\n`);
  console.log(`Examples: \n`);
  console.log(`  ${cyanColor}yarn cst
  yarn cst --${filterByName}=get
  yarn cst --${filterByName}=get --${warningTreshold}=30
  yarn cst --${filterByName}=get --${warningTreshold}=30 --${showOnlyErrors}${resetColor}\n`);
  process.exit(0);
};
