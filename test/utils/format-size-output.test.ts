import { formatSizeOutput } from "../../src/utils/format-size-output";
import { byteToMegabyte } from "../../src/utils/byte-to-megabyte";

jest.mock("../../src/utils/byte-to-megabyte", () => ({
  byteToMegabyte: jest.fn()
}));
describe("formatSizeOutput", () => {
  it("should return the size in bytes when size is less than 1 MB", () => {
    const size = 512;
    const sizeInMb = 0.5;

    // Mocking byteToMegabyte function to return 0.5
    (byteToMegabyte as jest.Mock).mockReturnValue(sizeInMb);

    // Expected result: "512 byte"
    expect(formatSizeOutput(size)).toBe("512 byte");

    // Verifying that byteToMegabyte is called with the correct argument
    expect(byteToMegabyte).toHaveBeenCalledWith(size);
  });

  it("should return the size in MB when size is 1 MB or greater", () => {
    const size = 2097152; // 2 MB
    const sizeInMb = 2;

    // Mocking byteToMegabyte function to return 2
    (byteToMegabyte as jest.Mock).mockReturnValue(sizeInMb);

    // Expected result: "2 MB"
    expect(formatSizeOutput(size)).toBe("2 MB");

    // Verifying that byteToMegabyte is called with the correct argument
    expect(byteToMegabyte).toHaveBeenCalledWith(size);
  });
});
