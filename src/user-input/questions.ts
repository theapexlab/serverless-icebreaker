import type {
  ConfirmQuestion,
  InputQuestion,
  ListQuestion,
  NumberQuestion,
} from "inquirer";

export const initialQuestion: ListQuestion = {
  type: "list",
  name: "init",
  message: "Please select a configuration method:",
  choices: ["Continue with default SST app", "Custom configuration"],
};

export const questions: InputQuestion | NumberQuestion | ConfirmQuestion = [
  {
    name: "buildPath",
    message:
      'Enter the path to your built lambda folder (e.g., ".sst/artifacts/"):',
  },
  {
    name: "searchTerm",
    message:
      'Please provide a search term to look for node modules in the lambda (e.g., "// node_modules/"):',
  },
  {
    type: "number",
    name: "warningThresholdMB",
    validate: (input: string) => {
      if (parseInt(input)) {
        return true;
      }
      return "Please enter a valid number";
    },
    message: "Enter an warning threshold in MB (e.g., 10):",
  },
  {
    type: "confirm",
    name: "detailedReport",
    message: "Would you like to receive a detailed report?",
  },
  {
    type: "confirm",
    name: "showOnlyErrors",
    message: "Do you prefer to see only errors?",
  },
  {
    name: "filterByName",
    message:
      "Enter the name of the specific lambda you want to filter (optional):",
  },
  {
    type: "confirm",
    name: "metadataOptIn",
    message: "Would you like to opt-in to anonymous usage data collection?",
  },
];
