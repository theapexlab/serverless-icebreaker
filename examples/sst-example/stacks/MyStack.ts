import { StackContext, Api, EventBus } from "sst/constructs";

export function API({ stack }: StackContext) {
  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10
    }
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [bus]
      }
    },
    routes: {
      "GET /simple": "packages/functions/src/simple-lambda.handler",
      "GET /long-cold-start":
        "packages/functions/src/get-long-cold-start.handler",
      "GET /optimized": "packages/functions/src/optimized.handler",
      "GET /unoptimized": "packages/functions/src/unoptimized.handler"
    }
  });

  stack.addOutputs({
    ApiEndpoint: api.url
  });
}
