import { readFileSync } from "fs";

export const readLambdaFile = (lambdaPath: string) => readFileSync(lambdaPath);
