import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

const simpleLambda = () => {
  return formatJSONResponse({
    message: "Hello Serverless Simple Lambda!"
  });
};

export const main = middyfy(simpleLambda);
