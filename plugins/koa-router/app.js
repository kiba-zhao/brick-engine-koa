/**
 * @fileOverview 应用入口
 * @name app.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { inject } = require('brick-engine');
const { KOA_ROUTER } = require('./lib/constants');
const Router = require('./lib/router');

module.exports = engine => {

  const config = engine.config.koaRouter;
  const { patterns, opts, ...options } = config || {};

  const router = new Router(options);
  if (patterns) {
    engine.build(patterns, opts, setup.bind(this, engine, router));
  } else {
    setup(engine, router);
  }

};

function setup(engine, router, modules) {
  if (modules) {
    router.init(modules);
  }
  inject(router, { name: KOA_ROUTER });
  engine.install(router);
}
