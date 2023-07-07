import inquirer from "inquirer";
import { initialQuestion } from "./questions";

export const getInitialAnswer = async () => {
  const initialAnswer = await inquirer.prompt(initialQuestion);
  return initialAnswer.init as string;
};
