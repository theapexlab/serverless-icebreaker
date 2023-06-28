import inquirer from "inquirer";
import type { Configuration } from "../types";
import { createConfigFile } from "../utils/config-handler";
import { Messages } from "../utils/messages";
import { consentMessage } from "./consent-message";
import { questions } from "./questions";

export const init = async () => {
  const answers = await inquirer.prompt(questions);
  createConfigFile(answers as Configuration);
  await consentMessage(Messages.CONFIG_CREATED);
};