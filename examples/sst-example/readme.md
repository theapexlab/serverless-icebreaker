# Usage with SST ⚙️

## Prerequisite:

Basic understanding of the [SST framework](https://sst.dev/)

We made a REST API with sst, followed these [steps](https://sst.dev/examples/how-to-create-a-rest-api-with-serverless.html)

## Usage Serverless Icebreaker:

Our example project contains 4 lambdas:

- simple-lambda / basic 'hello world' lambda
- get-long-cold-start / this lambda has a lot of unoptimized imports
- optimized / contains optimized DynamoDB import
- unoptimized / contains unoptimized AWS sdk import

Clone Serverless Icebreaker

```
git clone https://github.com/theapexlab/serverless-icebreaker.git
```

```
cd serverless-icebreaker/examples/sst-example/
```

Install dependencies:

```
npm install
```

Build your lambdas

```
npm run build
```

Check your lambda cold start with Serverless Icebreaker before deploy them:

```
npm run sib
```

We recommend use Serverless Icebreaker pipeline mode with husky pre-commit in your serverless project or make a github action. Read more about pipeline mode [here](https://github.com/theapexlab/serverless-icebreaker/blob/main/README.md).

```
npm run sib --pipeline
```
