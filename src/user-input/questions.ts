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
    message: 'Path to your built lambda folder eg. ".sst/artifacts/":',
  },
  {
    name: "searchTerm",
    message:
      'Please add a serch term to look for node modules in the lambda eg. "// node_modules":',
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
    message: "Please add a warning threshold in MB eg. 10:",
  },
  {
    type: "confirm",
    name: "detailedReport",
    message: "Do you want a detailed report? :",
  },
  {
    type: "confirm",
    name: "showOnlyErrors",
    message: "Do you want to show only errors?:",
  },
  {
    name: "filterByName",
    message: "Filter for a specific lambda name (optional)?:",
  },
];
