#!/usr/bin/env node
import { analyze } from "./analitics";
import { getConfig } from "./utils/config-handler";
import { getCommandLineArgs } from "./utils/get-command-line-args";

export const projectRoot = process.cwd();
export const commandLineArgs = getCommandLineArgs();
export const existingConfig = getConfig();

void analyze();
