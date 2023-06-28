// Here we optimized import the DynamoDB client from the aws-sdk package. This will reduce the file size and the cold start duration.

import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import DynamoDB from "aws-sdk/clients/dynamodb";

const dynamo = new DynamoDB();

export const handler: APIGatewayProxyHandlerV2 = async event => {
  return {
    statusCode: 200,
    body: "optimized"
  };
};
