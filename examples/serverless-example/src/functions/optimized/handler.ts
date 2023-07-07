// Here we optimized import the DynamoDB client from the aws-sdk package. This will reduce the file size and the cold start duration.
import { middyfy } from "@libs/lambda";
import DynamoDB from "aws-sdk/clients/dynamodb";

const optimized = () => {
  const dynamo = new DynamoDB();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "optimized"
    })
  };
};

export const main = middyfy(optimized);
