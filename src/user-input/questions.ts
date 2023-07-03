import type { ConfirmQuestion, InputQuestion, ListQuestion, NumberQuestion } from "inquirer";
import { ConfigurationMethods } from "../types";

export const initialConfigChoices = Object.values(ConfigurationMethods);

export const initialQuestion: ListQuestion = {
  type: "list",
  name: "init",
  message: "Please select a configuration method:",
  choices: initialConfigChoices
};

export const questions: InputQuestion | NumberQuestion | ConfirmQuestion = [
  {
    name: "buildPath",
    message: 'Enter the path to your built lambda folder (e.g., ".sst/artifacts/"):',
    default: ".sst/artifacts/"
  },
  {
    type: "number",
    name: "errorThresholdMB",
    validate: (input: string) => {
      if (parseInt(input)) {
        return true;
      }
      return "Please enter a valid number";
    },
    message: "Enter an error threshold in MB (e.g., 10):",
    default: 10
  },
  {
    type: "confirm",
    name: "detailedReport",
    message: "Would you like to receive a detailed report (include data of the optimal lambdas as well)?",
    default: true
  },
  {
    type: "confirm",
    name: "showOnlyErrors",
    message: "Do you prefer to see only errors?",
    default: false
  },
  {
    name: "filterByName",
    message: "Enter the name of the specific lambda you want to filter (optional):"
  },
  {
    name: "ignorePattern",
    message: "Enter a term, either complete or partial, to exclude from file names (optional):"
  },
  {
    type: "confirm",
    name: "metadataOptIn",
    message: "Would you like to opt-in to anonymous usage data collection?",
    default: true
  }
];
