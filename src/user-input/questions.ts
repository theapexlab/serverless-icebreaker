import type {
  ConfirmQuestion,
  InputQuestion,
  ListQuestion,
  NumberQuestion
} from "inquirer";

export const initialConfigChoices = [
  "Suggested configuration (optimized for SST apps)",
  "Custom configuration"
];

export const initialQuestion: ListQuestion = {
  type: "list",
  name: "init",
  message: "Please select a configuration method:",
  choices: initialConfigChoices
};

export const questions: InputQuestion | NumberQuestion | ConfirmQuestion = [
  {
    name: "buildPath",
    message:
      'Enter the path to your built lambda folder (e.g., ".sst/artifacts/"):',
    default: ".sst/artifacts/"
  },
  {
    name: "searchTerm",
    message:
      'Please provide a search term to look for node modules in the lambda (e.g., "// node_modules/"):',
    default: "// node_modules/"
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
    message:
      "Would you like to receive a detailed report (include data of the optimal lambdas as well)?",
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
    message:
      "Enter the name of the specific lambda you want to filter (optional):"
  },
  {
    name: "ignorePattern",
    message:
      "Enter a term that you want to ignore in the file names, either partially or completely (optional):"
  },
  {
    type: "confirm",
    name: "metadataOptIn",
    message: "Would you like to opt-in to anonymous usage data collection?",
    default: true
  }
];
