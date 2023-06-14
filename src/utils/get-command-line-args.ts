import yargs from "yargs";
import type { Configuration } from "../types";

type CommandLineArgs = Pick<
  Configuration,
  "errorThresholdMB" | "showOnlyErrors" | "filterByName" | "detailedReport"
> & { initialize: boolean };
export const getCommandLineArgs = (): Partial<CommandLineArgs> => {
  const result = yargs
    .option("errorThresholdMB", {
      alias: "warning-threshold",
      description: "Set a warning threshold in MB",
      type: "number"
    })
    .option("showOnlyErrors", {
      alias: "show-only-errors",
      description: "Show only the errors",
      type: "boolean"
    })
    .option("filterByName", {
      alias: "filter-by-name",
      description: "Search for a specific file name",
      type: "string"
    })
    .option("ignorePattern", {
      alias: "ignore-pattern",
      description: "Ignore a specific file name",
      type: "string"
    })
    .option("detailedReport", {
      alias: "detailed-report",
      description: "Create a detailed report",
      type: "boolean"
    })
    .option("initialize", {
      alias: "init",
      description: "Initialize the configuration file",
      type: "boolean",
      default: false
    })
    .help()
    .example(
      "yarn cst --filter-by-name=get --warning-threshold=5 --show-only-errors",
      "Show only the errors for the files that start with get and are bigger than 30MB"
    )
    .epilogue(
      "For more information, visit https://www.npmjs.com/package/@theapexlab/cold-start-tool"
    )
    .alias("help", "h").argv as Partial<Configuration>;

  return result;
};
