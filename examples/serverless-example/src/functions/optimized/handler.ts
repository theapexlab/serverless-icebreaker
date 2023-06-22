// Here we optimized import the DynamoDB client from the aws-sdk package. This will reduce the file size and the cold start duration.
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import DynamoDB from "aws-sdk/clients/dynamodb";

import schema from "./schema";

const optimized: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async event => {
  const dynamo = new DynamoDB();

  return {
    statusCode: 200,
    body: JSON.stringify("Hello from optimized lambda")
  };
};

export const main = middyfy(optimized);
