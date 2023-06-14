export const getLambdaDetails = (
  lambdaSize: number,
  modules: number,
  frequentModules: string
) =>
  `  Lambda size: ${lambdaSize} MB
   Imported modules: ${modules}
   Most frequent modules: ${frequentModules}\n`;
