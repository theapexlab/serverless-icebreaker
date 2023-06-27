enum SizesOfLambdasWithDurations {
  "1MB" = "150MS",
  "19.6MB" = "692MS",
  "30.2MB" = "1716MS",
  "52.8MB" = "2515MS"
}

export const getColdStartPrediction = (lambdaSize: number) => {
  for (const [size, duration] of Object.entries(SizesOfLambdasWithDurations)) {
    const sizeValue = parseFloat(size);
    const durationValue = parseFloat(duration);

    if (lambdaSize <= sizeValue) {
      return calculateColdStartPrediction(lambdaSize, durationValue, sizeValue);
    }
  }

  const largestSize = parseFloat(
    Object.keys(SizesOfLambdasWithDurations).pop()!
  );
  const largestDuration = parseFloat(
    Object.values(SizesOfLambdasWithDurations).pop()!
  );
  return calculateColdStartPrediction(lambdaSize, largestSize, largestDuration);
};

const calculateColdStartPrediction = (
  lambdaSize: number,
  coldStartDurationMS: number,
  exampleLambdaMB: number
) => Math.round(lambdaSize * (coldStartDurationMS / exampleLambdaMB));
