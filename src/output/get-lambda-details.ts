import { predictColdStartDuration } from "./get-cold-start-prediction";

export const getLambdaDetails = (
  lambdaSize: number,
  modules: number,
  frequentModules: string
) => {
  const coldStartDuration = predictColdStartDuration(lambdaSize);

  return `  Lambda size: ${lambdaSize} MB
   Imported modules: ${modules}
   Possible Cold Start Duration: ~${coldStartDuration} ms
   Most frequent modules: ${frequentModules}\n`;
};
