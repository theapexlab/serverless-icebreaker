const extensions = [".js", ".mjs"];

export const filterByExtension = (extension: string) =>
  extensions.includes(extension);
