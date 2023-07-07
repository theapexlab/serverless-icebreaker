import { calculateWarningThresholdMB } from "../../src/utils/get-warning-threshold";

describe("calculateWarningThresholdMB", () => {
  it("should calculate the warning threshold in MB based on the error threshold", () => {
    const testCases = [
      { errorThresholMB: 100, expectedWarningThresholdMB: 90 },
      { errorThresholMB: 50, expectedWarningThresholdMB: 45 },
      { errorThresholMB: 0, expectedWarningThresholdMB: 0 }
    ];

    testCases.forEach(({ errorThresholMB, expectedWarningThresholdMB }) => {
      expect(calculateWarningThresholdMB(errorThresholMB)).toBe(expectedWarningThresholdMB);
    });
  });

  it("should return 0 if the error threshold is not a number", () => {
    expect(calculateWarningThresholdMB(NaN)).toBe(0);
  });
});
