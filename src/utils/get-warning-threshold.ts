import { ERROR_WARING_RATIO } from "../constants";

export const calculateWarningThresholdMB = (errorThresholdMB: number) => errorThresholdMB * ERROR_WARING_RATIO || 0;
