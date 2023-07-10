import fsAsync from "fs/promises";

export const checkFileExist = async (filePath: string) => {
  try {
    await fsAsync.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
};
