export const byteToMegabyte = (bytes: number) =>
  (bytes / Math.pow(1024, 2)).toFixed(2);
