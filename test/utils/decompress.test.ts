import decompress from "decompress";
import { decompressFile } from "../../src/utils/decompress";
import { Messages } from "../../src/utils/messages";

jest.mock("decompress");

describe("decompressFile", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call decompress for each file and log the compressed file message once", async () => {
    const filePaths = ["file1.zip", "file2.zip"];
    const destinationPath = "/path/to/destination";

    const consoleInfoMock = jest.spyOn(console, "info");

    await decompressFile(filePaths, destinationPath);

    expect(decompress).toHaveBeenCalledTimes(filePaths.length);
    for (let i = 0; i < filePaths.length; i++) {
      expect(decompress).toHaveBeenCalledWith(filePaths[i], destinationPath);
    }

    expect(consoleInfoMock).toHaveBeenCalledTimes(1);
    expect(consoleInfoMock).toHaveBeenCalledWith(
      Messages.COMPRESSED_FILE_FOUND
    );
  });
});
