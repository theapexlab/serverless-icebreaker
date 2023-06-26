// Here we optimized import the DynamoDB client from the aws-sdk package. This will reduce the file size and the cold start duration.
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import DynamoDB from "aws-sdk/clients/dynamodb";

const optimized = () => {
  const dynamo = new DynamoDB();

  return formatJSONResponse({
    message: "Hello from optimized lambda"
  });
};

export const main = middyfy(optimized);
