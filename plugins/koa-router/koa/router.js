/**
 * @fileOverview 路由中间件
 * @name router.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { ENGINE, inject } = require('brick-engine');
const { KOA_ROUTER } = require('../lib/constants');

module.exports = (engine, router) => {

  const config = engine.config;
  const koaRouter = config.koaRouter;
  return koaRouter ? router.middleware : undefined;
};

inject(module.exports, { deps: [ ENGINE, KOA_ROUTER ], name: 'router' });
