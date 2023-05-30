export enum CommandLineArgs {
  filterByName = "filterByName",
  showOnlyErrors = "showOnlyErrors",
  warningTreshold = "warningTreshold",
  help = "help",
}

export const getCommandLineArg = (name: CommandLineArgs): string | null => {
  const args = process.argv.slice(2);
  for (const arg of args) {
    const [key, value] = arg.split("=");
    if (key === `--${name}`) {
      return value ? value : "1";
    }
  }
  return null;
};
