# ❄️ Cold start tool ❄️

## Introduction:

---
This tool is designed to analyze built AWS Lambdas. It can check the file size of the Lambdas and, if the build is not minified, it can identify the three most used/imported libraries in the Lambda function also creates metrics about all of the lambdas. If the size of the Lambda exceeds a specified threshold, a warning will be generated. Our default config is optimized for <a href="https://sst.dev/">SST framework</a>.
## Usage
---

Installation:
``` 
npm install @theapexlab/cold-start-tool --save-dev
```

Run:
```
npm run cst
```

Uninstall:
```
npm uninstall @theapexlab/cold-start-tool
```

## Behind the scenes
---
Upon first run, it creates a ``` cst-config.json ``` with the default settings for SST in the root of the project.

If the lambda is not minifed on buildtime the imported node-modules are commented like this ``` // node_modules/...``` , so this app basically count the occurances of the same imports, and if the file size is over 20MB (can be changed in ```cst-config.json```) the developer gets a warning, and the three most used libs in the lambda.

## Configuration
___
The configuration file ```cst-config.json``` can be found in the root of the project. Here you can change a few things:

* ```buildPath```: default folder where the built lambdas are located
* ```searchTerm```: the start of the node_module comments to find
* ```warningThresholdMB```: the maximum acceptable size of the lambda in megabytes
* ```showOnlyErrors```: show only the files the exceeds the warning threshold
* ```filterByName```: searchfilter for files
* ```detailedReport```: gives you a detailed report and the end
## Custom arguments
___

Search for something specific in a lambda's name: 
```
npm run cst --filterByName=get
```

Overwrite the warning threshold:
```
npm run cst --warningThresholdMB=30
```

To show only the files that exceeds the waring threshold:
```
npm run cst --showOnlyErrors
```
To run a detailed report:
```
npm run cst --detailed-report
```
To see all available options:

```
npm run cst --help
```

