import fs from "fs/promises";

export const checkFileExist = async (filePath: string) => {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
};
