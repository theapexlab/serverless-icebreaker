// Here we import the whole aws sdk instead of the DynamoDB client. This will increase the file size and the cold start duration.
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

import schema from "./schema";

const unoptimized: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async event => {
  const DynamoDB = new AWS.DynamoDB();

  return {
    statusCode: 200,
    body: "hello cold start"
  };
};

export const main = middyfy(unoptimized);
