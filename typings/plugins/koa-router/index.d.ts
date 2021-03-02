import Router = require("./lib/router");
export function createRouter(...args: any[]): Router;
import { route } from "./lib/utils";
import { controller } from "./lib/utils";
import { rest } from "./lib/utils";
import { middleware } from "./lib/utils";
export { Router, route, controller, rest, middleware };
