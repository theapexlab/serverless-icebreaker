# ⚙️ Usage of Serverless Icebreaker with SST

In this guide, we will walk you through the process of leveraging the Serverless Icebreaker tool in a Serverless Stack (SST) based project.

## Prerequisites

A basic understanding of the [SST framework](https://sst.dev/). If you're new to SST, check out the getting started guide on the official website.
Node.js and npm installed on your local development machine.
We've created a REST API with SST following the [steps described here](https://sst.dev/examples/how-to-create-a-rest-api-with-serverless.html).

## About the Example Project

The example project we'll be using contains four AWS Lambda functions:

- `simple-lambda`: A basic 'Hello, World!' Lambda function.
- `get-long-cold-start`: A Lambda function with many unoptimized imports, designed to illustrate longer cold start times.
- `optimized`: This Lambda function contains an optimized import of DynamoDB.
- `unoptimized`: This Lambda function contains an unoptimized import of the AWS SDK.

## Getting Started

First, clone the Serverless Icebreaker repository:

```
git clone https://github.com/theapexlab/serverless-icebreaker.git
```

Then navigate into the SST example project directory:

```
cd serverless-icebreaker/examples/sst-example/
```

Run preparation script:

```
npm run preparation
```

Install the necessary dependencies:

```
npm install
```

Now, you're ready to build the Lambda functions:

```
npm run build
```

## Using Serverless Icebreaker

Before deploying the Lambda functions, you can use Serverless Icebreaker to check their cold start times:

```
npx sib
```

This command will generate a report showing you the cold start times of your functions. You can use this information to identify any bottlenecks and optimize your code accordingly.

For continuous monitoring, we recommend using Serverless Icebreaker in pipeline mode. You can incorporate it into your serverless project's pre-commit hook with Husky, or use it in a GitHub action. To learn more about pipeline mode, check out the Serverless Icebreaker readme [here](https://github.com/theapexlab/serverless-icebreaker/blob/main/README.md).

To run Serverless Icebreaker in pipeline mode, use:

```
npx sib --pipeline
```

That's it! You're now equipped to monitor and optimize your AWS Lambda functions' cold start times using Serverless Icebreaker and SST. Happy coding!

Please don't hesitate to contribute or open an [issue](https://github.com/theapexlab/serverless-icebreaker/issues/new?labels=bug) for any questions, problems, or [feature requests](https://github.com/theapexlab/serverless-icebreaker/issues/new?labels=feature).

## License

Distributed under the MIT License. See [LICENSE](https://github.com/theapexlab/cold-start-tool/blob/main/LICENSE) for more information.
