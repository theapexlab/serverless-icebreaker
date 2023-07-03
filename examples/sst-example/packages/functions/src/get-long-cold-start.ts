// unoptimized unused imports to achive bigger file size and longer cold start
import * as awsLambda from "aws-lambda";
import * as THREE from "three";
import * as AWS from "aws-sdk";
import * as fs from "fs";
import * as awsCdkLib from "aws-cdk-lib";
import * as awsxraysdk from "aws-xray-sdk";

const AWS_xray = awsxraysdk.captureAWS(AWS);
export const handler: awsLambda.APIGatewayProxyHandlerV2 = async event => {
  const scene = new THREE.Scene();
  const aws = new AWS.S3();
  const cdk = new awsCdkLib.App();
  const file = fs;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "get long cold start"
    })
  };
};
