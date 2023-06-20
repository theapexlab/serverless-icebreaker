import { predictColdStartDuration } from "./get-cold-start-prediction";

export const getLambdaDetails = (
  lambdaSize: number,
  modules: number,
  frequentModules: string,
  lambdaPath: string
) => {
  const coldStartDuration = predictColdStartDuration(lambdaSize);

  return `  Lambda size: ${lambdaSize} MB
   Lambda path: ${lambdaPath}
   Imported modules: ${modules}
   Possible Cold Start Duration: ~${coldStartDuration} ms
   Most frequent modules: ${frequentModules}\n`;
};
