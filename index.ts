#!/usr/bin/env node
import { analyze } from "./src/analyze";
import { configHandler } from "./src/utils/config-handler";
import { getWarningThresholdMB } from "./src/utils/constants";

export const projectRoot = process.cwd();
export const config = configHandler();

export const warningThresholdMB = getWarningThresholdMB();

analyze();
