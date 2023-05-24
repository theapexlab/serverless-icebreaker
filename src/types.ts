export type NodeModuleFrequency = {
  [key: string]: number;
};

export type Configuration = {
  buildPath: string;
  warningTreshold: number;
  searchTerm: string;
  name?: string;
  showOnlyErrors?: boolean;
  fileSize?: number;
};
