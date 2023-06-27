#!/usr/bin/env node
import { main } from "./analitics";
import { getCommandLineArgs } from "./utils/get-command-line-args";

export const projectRoot = process.cwd();
export const commandLineArgs = getCommandLineArgs();

void main();
