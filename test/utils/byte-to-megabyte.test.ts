import { byteToMegabyte } from "../../src/utils/byte-to-megabyte";

describe("byteToMegabyte", () => {
  it("should convert bytes to megabytes correctly", () => {
    expect(byteToMegabyte(1)).toBe(0.0);

    expect(byteToMegabyte(1024)).toBe(0.0);

    expect(byteToMegabyte(1048576)).toBe(1.0);

    expect(byteToMegabyte(3145728)).toBe(3.0);

    expect(byteToMegabyte(5678901)).toBe(5.42);
  });
});
