import { byteToMegabyte } from "./byte-to-megabyte";

export const formatSizeOutput = (size: number) => {
  const sizeInMB = byteToMegabyte(size);
  if (sizeInMB < 1) {
    return `${size} byte`;
  }
  return `${sizeInMB} MB`;
};
