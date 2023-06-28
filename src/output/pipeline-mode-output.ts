import { OutputTypes } from "../types";
import type { LambdaData } from "../types";
import { Messages } from "../utils/messages";
import { getOutputMessage } from "./get-output-message";

export const pipelineModeOutput = (lambdasWithErrors: LambdaData[]) => {
  console.error(Messages.ERROR_THRESHOLD_EXCEEDED);

  lambdasWithErrors.forEach(module => {
    console.info(getOutputMessage(module, OutputTypes.ERROR));
  });

  process.exit(1);
};
