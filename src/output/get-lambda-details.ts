export const getLambdaDetails = (
  lambdaSize: number,
  modules: number,
  frequentModules: string,
  lambdaPath: string,
  possibleColdStartDuration: number
) => {
  return `  Lambda size: ${lambdaSize} MB
   Lambda path: ${lambdaPath}
   Imported modules: ${modules}
   Possible Cold Start Duration: ~${possibleColdStartDuration} ms
   Most frequent modules: ${frequentModules}\n`;
};
