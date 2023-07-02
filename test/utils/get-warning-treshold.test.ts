import { warningThresholdMB } from "../../src/utils/get-warning-threshold";

describe("warningThresholdMB", () => {
  it("should calculate the warning threshold in MB based on the error threshold", () => {
    expect(warningThresholdMB(100)).toBe(90);

    expect(warningThresholdMB(50)).toBe(45);

    expect(warningThresholdMB(0)).toBe(0);
  });

  it("should return 0 if the error threshold is not a number", () => {
    expect(warningThresholdMB(NaN)).toBe(0);
  });
});
