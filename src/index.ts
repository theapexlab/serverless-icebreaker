#!/usr/bin/env node
import { config } from "yargs";
import { analyze } from "./analyze";
import { createOutput } from "./output";
import { createReport, createDetailedReport } from "./analyze/create-report";
import { sendMetadataToMixpanel } from "./metrics/mixpanel";
import { CSTData } from "./types";
import { getConfig } from "./utils/config-handler";
import { getCommandLineArgs } from "./utils/get-command-line-args";
import { type } from "os";

export const projectRoot = process.cwd();
export const commandLineArgs = getCommandLineArgs();
export const existingConfig = getConfig();

void analyze()
    
