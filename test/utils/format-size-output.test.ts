import { formatSizeOutput } from "../../src/utils/format-size-output";
import { byteToMegabyte } from "../../src/utils/byte-to-megabyte";

jest.mock("../../src/utils/byte-to-megabyte", () => ({
  byteToMegabyte: jest.fn()
}));
describe("formatSizeOutput", () => {
  it("should return the size in bytes when size is less than 1 MB", () => {
    const sizeInByte = 512;
    const sizeInMb = 0.5;
    const expectedResult = "512 byte";

    // Mocking byteToMegabyte function to return 0.5
    (byteToMegabyte as jest.Mock).mockReturnValue(sizeInMb);

    expect(formatSizeOutput(sizeInByte)).toBe(expectedResult);

    // Verifying that byteToMegabyte is called with the correct argument
    expect(byteToMegabyte).toHaveBeenCalledWith(sizeInByte);
  });

  it("should return the size in MB when size is 1 MB or greater", () => {
    const sizeInByte = 2097152; // 2 MB
    const sizeInMb = 2;
    const expectedResult = "2 MB";

    // Mocking byteToMegabyte function to return 2
    (byteToMegabyte as jest.Mock).mockReturnValue(sizeInMb);

    expect(formatSizeOutput(sizeInByte)).toBe(expectedResult);

    // Verifying that byteToMegabyte is called with the correct argument
    expect(byteToMegabyte).toHaveBeenCalledWith(sizeInByte);
  });
});
