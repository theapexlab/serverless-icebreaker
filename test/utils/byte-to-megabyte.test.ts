import { byteToMegabyte } from "../../src/utils/byte-to-megabyte";

describe("byteToMegabyte", () => {
  it("should convert bytes to megabytes correctly", () => {
    const testCases = [
      { byte: 1, expectedMB: 0.0 },
      { byte: 1024, expectedMB: 0.0 },
      { byte: 1048576, expectedMB: 1.0 },
      { byte: 3145728, expectedMB: 3.0 },
      { byte: 5678901, expectedMB: 5.42 }
    ];

    testCases.forEach(({ byte, expectedMB }) => {
      const result = byteToMegabyte(byte);

      expect(result).toBe(expectedMB);
    });
  });
});
