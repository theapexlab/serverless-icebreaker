import { OutputTypes } from "../types";
import type { LambdaData } from "../types";
import { Messages } from "../utils/messages";
import { getOutputMessage } from "./get-output-message";

export const pipelineModeOutput = (lambdasWithErrors: LambdaData[]) => {
  console.error(Messages.ERROR_THRESHOLD_EXCEEDED);

  lambdasWithErrors.forEach(lambda => {
    console.info(getOutputMessage(lambda, OutputTypes.ERROR));
  });

  process.exit(1);
};
