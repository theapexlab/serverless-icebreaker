import { getPercentageString } from "../../src/utils/get-percentage";

describe("getPercentageString", () => {
  it("should return the percentage as a string with 2 decimal places", () => {
    expect(getPercentageString(5, 10)).toBe("50.00%");

    expect(getPercentageString(3, 8)).toBe("37.50%");

    expect(getPercentageString(0, 20)).toBe("0.00%");
  });
});
