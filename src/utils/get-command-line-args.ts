export const getCommandLineArg = (name: string) => {
  const args = process.argv.slice(2);
  for (const arg of args) {
    const [key, value] = arg.split("=");
    if (key === `--${name}`) {
      return value;
    }
  }
  return undefined;
};
