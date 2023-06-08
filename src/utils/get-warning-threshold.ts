export const warningThresholdMB = (errorThresholdMB: number) =>
  errorThresholdMB * 0.9 || 0;
