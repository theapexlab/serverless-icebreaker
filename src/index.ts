#!/usr/bin/env node
import { analyze } from "./analyze";
import { getConfig } from "./utils/config-handler";
import { getCommandLineArgs } from "./utils/get-command-line-args";
// import ora from "ora";

// const spinner = ora("Loading unicorns").start();

// setTimeout(() => {
//   spinner.color = "yellow";
//   spinner.text = "Loading rainbows";
// }, 1000);
export const projectRoot = process.cwd();
export const commandLineArgs = getCommandLineArgs();
export const existingConfig = getConfig();

void analyze();
