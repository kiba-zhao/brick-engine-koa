/**
 * @fileOverview 路由中间件
 * @name router.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const compose = require('koa-compose');
// const Router = require('@koa/router');

/**
 * @inject router 注入模型名称
 * @dependency koa-router 依赖配置文件
 */

module.exports = (router) => {

  // const koaRouter = config.koaRouter;
  // const router = new Router(koaRouter);
  // provider.define('koa-router', [], router);

  return compose(router.routes(), router.allowedMethods());
};
