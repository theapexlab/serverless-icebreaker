export const calculateColdStartPrediction = (
  lambdaSize: number,
  coldStartDurationMS: number,
  exampleLambdaMB: number
) => Math.round(lambdaSize * (coldStartDurationMS / exampleLambdaMB));
