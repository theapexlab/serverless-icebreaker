// Here we import the whole aws sdk instead of the DynamoDB client. This will increase the file size and the cold start duration.
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

const unoptimizedWhitoutTreeShaking = () => {
  const DynamoDB = new AWS.DynamoDB();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "unoptimized without tree shaking"
    })
  };
};

export const main = middyfy(unoptimizedWhitoutTreeShaking);
