import { calculateWarningThresholdMB } from "../../src/utils/get-warning-threshold";

describe("warningThresholdMB", () => {
  it("should calculate the warning threshold in MB based on the error threshold", () => {
    expect(calculateWarningThresholdMB(100)).toBe(90);

    expect(calculateWarningThresholdMB(50)).toBe(45);

    expect(calculateWarningThresholdMB(0)).toBe(0);
  });

  it("should return 0 if the error threshold is not a number", () => {
    expect(calculateWarningThresholdMB(NaN)).toBe(0);
  });
});
