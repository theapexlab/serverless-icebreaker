import { config } from "../..";

export const warningThresholdMB = () => config.errorThresholdMB * 0.9 || 0;
