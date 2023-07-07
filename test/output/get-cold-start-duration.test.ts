import { getColdStartPrediction } from "../../src/output/get-cold-start-prediction";

describe("getColdStartPrediction", () => {
  it("should calculate the cold start prediction correctly", () => {
    const testCases = [
      { lambdaSizeMB: 11.9, expectedColdStartDurationMS: 420 },
      { lambdaSizeMB: 17, expectedColdStartDurationMS: 600 },
      { lambdaSizeMB: 24.4, expectedColdStartDurationMS: 1386 },
      { lambdaSizeMB: 42.3, expectedColdStartDurationMS: 2015 }
    ];

    testCases.forEach(({ lambdaSizeMB, expectedColdStartDurationMS }) => {
      expect(getColdStartPrediction(lambdaSizeMB)).toBe(expectedColdStartDurationMS);
    });
  });
});
