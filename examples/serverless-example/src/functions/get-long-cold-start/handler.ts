// unoptimized unused imports to achive bigger file size and longer cold start
import { middyfy } from "@libs/lambda";
import * as awsCdkLib from "aws-cdk-lib";
import * as AWS from "aws-sdk";
import * as awsxraysdk from "aws-xray-sdk";
import * as fs from "fs";
import * as THREE from "three";

const getLongColdStart = () => {
  const AWS_xray = awsxraysdk.captureAWS(AWS);
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

export const main = middyfy(getLongColdStart);
