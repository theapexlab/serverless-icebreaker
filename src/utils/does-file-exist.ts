import fs from "fs/promises";

export const doesFileExist = async (filePath: string) => await fs.stat(filePath).catch(() => false);
