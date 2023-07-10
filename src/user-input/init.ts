import inquirer from "inquirer";
import type { Configuration } from "../types";
import { createConfigFile } from "./config-handler";
import { Messages } from "../utils/messages";
import { consentMessage } from "./consent-message";
import { questions } from "./questions";

export const init = async () => {
  const answers = await inquirer.prompt(questions);

  await createConfigFile(answers as Configuration);
  await consentMessage(Messages.CONFIG_CREATED);
};
