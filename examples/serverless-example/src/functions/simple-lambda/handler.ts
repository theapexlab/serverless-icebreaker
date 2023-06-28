import { middyfy } from "@libs/lambda";

const simpleLambda = () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello, World!"
    })
  };
};

export const main = middyfy(simpleLambda);
