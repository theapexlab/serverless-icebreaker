#!/usr/bin/env node
import { analyze } from "./src/analyze";
import { getCommandLineArgs } from "./src/utils/get-command-line-args";

export const projectRoot = process.cwd();
export const commandLineArgs = getCommandLineArgs();

analyze();
