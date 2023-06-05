#!/usr/bin/env node
import { analyze } from "./src/analyze";
import { configHandler } from "./src/utils/config-handler";

export const projectRoot = process.cwd();
export const config = configHandler();

analyze();
