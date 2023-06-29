import decompress from "decompress";
import { Messages } from "./messages";

export const decompressFile = async (filePath: string[], destinationPath: string) => {
  console.info(Messages.COMPRESSED_FILE_FOUND);
  for (const file of filePath) {
    await decompress(file, destinationPath);
  }
};
