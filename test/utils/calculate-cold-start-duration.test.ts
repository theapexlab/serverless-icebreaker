import { calculateColdStartPrediction } from "../../src/utils/calculate-cold-start-prediction";

describe("calculateColdStartPrediction", () => {
  it("should calculate the cold start prediction correctly", () => {
    expect(calculateColdStartPrediction(1024, 100, 256)).toBe(400);

    expect(calculateColdStartPrediction(512, 200, 512)).toBe(200);

    expect(calculateColdStartPrediction(2048, 150, 128)).toBe(2400);
  });
});
