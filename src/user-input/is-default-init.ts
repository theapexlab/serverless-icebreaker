import inquirer from "inquirer";
import { initialQuestion, initialConfigChoices } from "./questions";

export const isDefaultInit = async (): Promise<boolean> => {
  const inititalAnswer = await inquirer.prompt(initialQuestion);

  return inititalAnswer.init === initialConfigChoices[0];
};
