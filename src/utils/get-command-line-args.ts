import yargs from "yargs";
import { Configuration } from "../types";

type CommandLineArgs = Pick<
  Configuration,
  "warningTreshold" | "showOnlyErrors" | "filterByName"
>;
export const getCommandLineArgs = (): Partial<CommandLineArgs> => {
  const result = yargs
    .option("warningTreshold", {
      alias: "warning-treshold",
      description: "Set a warning treshold in MB",
      type: "number",
    })
    .option("showOnlyErrors", {
      alias: "show-only-errors",
      description: "Show only the errors",
      type: "boolean",
      default: false,
    })
    .option("filterByName", {
      alias: "filter-by-name",
      description: "Search for a specific file name",
      type: "string",
    })
    .help()
    .example(
      "yarn cst --filter-by-name=get --warning-treshold=30 --show-only-errors",
      "Show only the errors for the files that start with get and are bigger than 30MB"
    )
    .alias("help", "h").argv as Partial<Configuration>;

  return result;
};
