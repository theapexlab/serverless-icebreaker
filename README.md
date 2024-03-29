# <div style="display: flex; align-items: center;"><img src="img/sib-logo.png" width="45" style="margin-right: 10px;"/> Serverless Icebreaker</div>

## Introduction

The serverless Icebreaker is a utility designed to analyze pre-built AWS Lambdas and mitigate cold start duration. Cold start duration can result in user experience issues, such as lengthy page loading times. By optimizing the size of the lambda build, you can reduce cold start duration and improve overall performance.

### Features

- `Lambda Size Analysis`: The Serverless Icebreaker examines the file size of AWS Lambdas and identifies if the build is not compacted.
- `Library Usage`: It identifies the three most frequently utilized or imported libraries in the Lambda function.
- `Metrics Generation`: The tool generates metrics for all analyzed Lambdas, allowing you to monitor their sizes and track improvements over time.
- `Threshold Errors`: If a Lambda's size exceeds a specified threshold, the tool generates an error, indicating the need for optimization.
- `Framework Optimization`: The default configuration of the Serverless Icebreaker is optimized for the [SST](https://sst.dev/) and [Serverless](https://www.serverless.com/) frameworks, making it easy to integrate and use within your projects.

### [About cold start duration](https://docs.aws.amazon.com/lambda/latest/operatorguide/execution-environments.html#cold-start-latency)

![](img/chart.png)

The chart illustrates the correlation between lambda build size and cold start duration. As the lambda build size increases, the cold start duration also tends to be longer. This relationship highlights the importance of optimizing the lambda build size to reduce cold start latency and enhance overall performance.

Our mission is to minimize cold start duration and improve user experience. One of the most effective practices we recommend is optimizing your lambda build size

<table>
<tr><th>Lambda build size</th><th>Cold start duration</th></tr>
<tr><td>1 MB</td><td>150 ms</td></tr>
<tr><td>19.6 MB</td><td>692 ms</td></tr>
<tr style='color:red;'><td>30.2 MB</td><td>1716 ms</td></tr>
<tr style='color:red;'><td>52.8 MB</td><td>2515 ms</td></tr>
</table>

Here some [examples](https://docs.aws.amazon.com/lambda/latest/operatorguide/static-initialization.html) how to optimize your lambda imports:

```javascript
// Instead of const AWS = require('aws-sdk'), use:
const DynamoDB = require('aws-sdk/clients/dynamodb')

// Instead of const AWSXRay = require('aws-xray-sdk'), use:
const AWSXRay = require('aws-xray-sdk-core')

// Instead of const AWS = AWSXRay.captureAWS(require('aws-sdk')), use:
const dynamodb = new DynamoDB.DocumentClient()
AWSXRay.captureAWSClient(dynamodb.service)
```

## Usage

![](img/sib-demo.gif)

### Icons:

- ✅ - `SUCCESS` / The lambda build size is lower than the error threshold
- 🚧 - `WARNING` / The lambda build size is within 10% of the error threshold
- ❌ - `ERROR` / The lambda build size is higher than error threshold

### Installation:

```bash
npm install @theapexlab/serverless-icebreaker --save-dev
or
yarn add @theapexlab/serverless-icebreaker -D
```

### Run:

```
npx sib
or
yarn sib
```

### Uninstall:

```
npm uninstall @theapexlab/serverless-icebreaker
or
yarn remove @theapexlab/serverless-icebreaker
```

## How It Works

When Serverless Icebreaker runs for the first time, it interacts with you by asking several initialization questions.

You have three initialization options to choose from:

- Optimize for SST
- Optimize for Serverless Framework
- Custom initialization

Depending on your selection, Serverless Icebreaker will generate a sib-config.json file in your project's root directory with the corresponding preset settings.

Subsequently, it will examine your Lambda function. If the function is not minified during the build, the Node.js modules imported will be annotated like so: // node_modules/.... Serverless Icebreaker counts the occurrences of these imports, providing a picture of which libraries your function uses the most.

Should the size of your file exceed 20 MB (an error threshold you can customize in sib-config.json), Serverless Icebreaker triggers an error. It also reports the top three most frequently used libraries in the function. This data assists you in identifying which libraries might be contributing the most to the file size, providing a starting point for optimization.

## Configuration

The configuration file `sib-config.json` can be found at the root of the project. Here you can change a few things:

- `buildPath`: default folder where the built lambdas are located
- `errorThresholdMB`: the maximum acceptable size of the lambda in megabytes
- `showOnlyErrors`: show only the files that exceed the error threshold
- `filterByName`: search filter for files
- `ignorePattern`: term, either complete or partial, to exclude from file names
- `detailedReport`: gives you a detailed report and the end

## Custom arguments

Search for something specific in a lambda's name:

```
npx sib --filterByName=get
```

Add string to ignore in file names:

```
npx sib --ignore-pattern=redis
```

Overwrite the error threshold:

```
npx sib --errorThresholdMB=30
```

To show only the files that exceed the error threshold:

```
npx sib --showOnlyErrors
```

To run a detailed report:

```
npx sib --detailed-report
```

To see all available options:

```
npx sib --help
```

## Pipeline Mode

When using the --pipeline flag (a sib-config.json configuration file is required), in the absence of any errors, no output will be generated. However, if an error does occur, the program will exit with code 1.

This feature allows you to seamlessly integrate it into your existing pipeline, such as Husky or GitHub Actions, for efficient error handling and continuous integration.

For optimal results it is advisable to perform a build before every run.

```
npx sib --pipeline
or
yarn sib --pipeline
```

1. Add to [husky](https://www.npmjs.com/package/husky).

```
npx husky add .husky/pre-commit "npx sib --pipeline"
```

2. Add to Github Action

```yaml
jobs:
    ...
    steps:
    ...
      - name: sib
        run: npx sib --pipeline
```

## Examples of how to use Serverless Icebreaker with

- [SST framework](https://github.com/theapexlab/serverless-icebreaker/blob/main/examples/sst-example/README.md)
- [Serverless framework](https://github.com/theapexlab/serverless-icebreaker/blob/main/examples/serverless-example/README.md)

## Support

### Ask a question

If you have any questions or need clarification about SIB, feel free to ask in the repository. Other community members and maintainers can provide insights, solutions, and guidance to help you out.

[👉 Ask a question](https://github.com/theapexlab/serverless-icebreaker/discussions)

### Create a bug report

Encountered an error or facing an issue with SIB? Make sure to create a bug report. By reporting bugs, you contribute to the improvement of the tool and help the maintainers identify and address any problems.

[👉 Create bug report](https://github.com/theapexlab/serverless-icebreaker/issues/new?labels=bug)

### Submit a feature request

Have a brilliant idea for a new feature or enhancement in SIB? Submit a feature request to share your suggestions with the community. It's an opportunity to shape the future of the tool and contribute to its growth.

[👉 Submit feature request](https://github.com/theapexlab/serverless-icebreaker/issues/new?labels=feature)

## Created by [Apex lab](https://www.apexlab.io/)

We are digital product experts with a vision of delivering top-quality solutions focusing on serverless.

<a href="https://www.apexlab.io/"><img src="img/apex.png" width="250" alt="Apex lab"/></a>
