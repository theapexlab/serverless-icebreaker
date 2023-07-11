#!/usr/bin/env node
import { main } from "./analitics";
import { getCommandLineArgs } from "./user-input/get-command-line-args";

export const projectRoot = process.cwd();
export const commandLineArgs = getCommandLineArgs();

void main();
