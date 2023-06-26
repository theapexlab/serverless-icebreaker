enum SizesOfLambdas {
  "1MB" = 1,
  "19.6MB" = 19.6,
  "30.2MB" = 30.2,
  "52.8MB" = 52.8
}

enum ColdStartDurationsInMS {
  "150MS" = 150,
  "692MS" = 692,
  "1716MS" = 1716,
  "2515MS" = 2515
}

export const getColdStartPrediction = (lambdaSize: number) => {
  if (lambdaSize <= SizesOfLambdas["1MB"]) {
    return ColdStartDurationsInMS["150MS"];
  }

  if (lambdaSize <= SizesOfLambdas["19.6MB"]) {
    return calculateColdStartPrediction(
      lambdaSize,
      ColdStartDurationsInMS["692MS"],
      SizesOfLambdas["19.6MB"],
      ColdStartDurationsInMS["150MS"]
    );
  }

  if (lambdaSize <= SizesOfLambdas["30.2MB"]) {
    return calculateColdStartPrediction(
      lambdaSize,
      ColdStartDurationsInMS["1716MS"],
      SizesOfLambdas["30.2MB"],
      ColdStartDurationsInMS["692MS"]
    );
  }

  return calculateColdStartPrediction(
    lambdaSize,
    ColdStartDurationsInMS["2515MS"],
    SizesOfLambdas["52.8MB"],
    ColdStartDurationsInMS["1716MS"]
  );
};

const calculateColdStartPrediction = (
  lambdaSize: number,
  coldStartDurationMS: number,
  exampleLambdaMB: number,
  fallbackMS: number
) =>
  Math.max(
    Math.round(lambdaSize * (coldStartDurationMS / exampleLambdaMB)),
    fallbackMS
  );
