export const getLambdaDetails = (
  lambdaSize: number,
  modules: number,
  frequentModules: string,
  possibleColdStartDuration: number
) => {
  return `  Lambda size: ${lambdaSize} MB
   Imported modules: ${modules}
   Possible Cold Start Duration: ~${possibleColdStartDuration} ms
   Most frequent modules: ${frequentModules}\n`;
};
