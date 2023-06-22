import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const simpleLambda: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async event => {
  return formatJSONResponse({
    message: "Hello Serverless Simple Lambda!",
    event
  });
};

export const main = middyfy(simpleLambda);
