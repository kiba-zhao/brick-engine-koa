import { inject } from "brick-engine";
import { provide } from "brick-engine";
import { logger } from "brick-log4js";
import { route } from "./plugins/koa-router";
import { controller } from "./plugins/koa-router";
import { rest } from "./plugins/koa-router";
export { inject, provide, logger, route, controller, rest };
