export const filterByExtension = (file: string) =>
  /\.(js|mjs)$/i.test(file) ? ".js" : ".mjs";
