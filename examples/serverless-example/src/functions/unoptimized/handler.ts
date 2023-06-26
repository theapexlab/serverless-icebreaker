// Here we import the whole aws sdk instead of the DynamoDB client. This will increase the file size and the cold start duration.
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

const unoptimized = () => {
  const DynamoDB = new AWS.DynamoDB();

  return formatJSONResponse({
    message: "Hello cold start"
  });
};

export const main = middyfy(unoptimized);
