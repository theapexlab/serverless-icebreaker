import { statSync } from "fs";

export const getLambdaSize = (lambdaPath: string) => statSync(lambdaPath).size;
