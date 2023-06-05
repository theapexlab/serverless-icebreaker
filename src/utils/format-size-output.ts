import { byteToMegabyte } from "./byte-to-megabyte";

export const formatSizeOutput = (size: number) => {
  const sizeInMb = byteToMegabyte(size);
  if (sizeInMb < 1) {
    return `${size.toString()} byte`;
  }
  return `${sizeInMb.toString()} MB`;
};
