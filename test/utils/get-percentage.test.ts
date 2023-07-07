import { getPercentageString } from "../../src/utils/get-percentage";

describe("getPercentageString", () => {
  it("should return the percentage as a string with 2 decimal places", () => {
    const number = Math.floor(Math.random() * 100);
    const halfOfNumber = number / 2;
    const quarterOfNumber = number / 4;
    const expectedForHalf = "50.00%";
    const expectedForQuarter = "25.00%";
    const expectedForZero = "0.00%";

    const resultForHalf = getPercentageString(halfOfNumber, number);
    const resultForQuarter = getPercentageString(quarterOfNumber, number);
    const resultForZero = getPercentageString(0, number);

    expect(resultForHalf).toBe(expectedForHalf);
    expect(resultForQuarter).toBe(expectedForQuarter);
    expect(resultForZero).toBe(expectedForZero);
  });
});
