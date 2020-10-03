import * as _ from "lodash";

import { Namespace, OpenAPIRoute, Router } from "@serverless-seoul/corgi";

import { exceptionHandler } from "./exception_handler";
import { routes } from "./routes";

import * as Entities from "./entities";

export const router = new Router([
  new OpenAPIRoute(
    "/open-api",
    {
      title: "TodoApp",
      version: "1.0.0",
      definitions: Entities,
    },
    routes,
  ),
  new Namespace("", {}, {
    children: routes,
    exceptionHandler
  }),
], {
  middlewares: []
});

export const handler = router.handler();
