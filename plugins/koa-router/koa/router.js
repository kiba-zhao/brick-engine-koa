/**
 * @fileOverview 路由中间件
 * @name router.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const compose = require('koa-compose');

/**
 * @inject router 注入模型名称
 * @dependency config 依赖配置文件
 * @dependency koa-router 依赖路由对象
 */

module.exports = (config, router) => {

  const koaRouter = config.koaRouter;
  return koaRouter ? compose(router.routes(), router.allowedMethods()) : undefined;
};
