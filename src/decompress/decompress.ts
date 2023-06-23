import decompress from "decompress";
import { Messages } from "../utils/messages";

export const decompressFile = async (
  filePath: string[],
  destinationPath: string
) => {
  for (const file of filePath) {
    await decompress(file, destinationPath);
  }

  console.info(Messages.COMPRESSED_FILE_FOUND);
};
