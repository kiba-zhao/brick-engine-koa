/**
 * @fileOverview 路由中间件
 * @name router.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { inject } = require('brick-engine');

module.exports = (config, router) => {

  const koaRouter = config.koaRouter;
  return koaRouter ? router.middleware : undefined;
};

inject(module.exports, ['config', 'koa-router'], 'router');
