/**
 * @fileOverview 应用入口
 * @name app.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { ENGINE, inject } = require('brick-engine');
const { assign, isFunction, isString, isSymbol } = require('lodash');

const Router = require('./lib/router');
const KoaServer = require('./lib/koa_server');
const { KOA, APP } = require('./lib/constants');

module.exports = engine => {

  const config = engine.config;
  if (!config[KOA]) {
    return;
  }

  const { patterns, opts, ...options } = config.koaRouter || {};
  const router = new Router(options);
  if (patterns) {
    engine.build(patterns, opts, init.bind(this, engine, router));
  } else {
    init(engine, router);
  }

};

inject(module.exports, { deps: [ ENGINE ] });

function init(engine, router, modules) {

  if (modules) {
    router.init(modules);
  }

  const ctx = { router: router.middleware };
  const config = engine.config[KOA];

  const { patterns, opts, ...options } = config;
  const server = new KoaServer(options);
  inject(server, { name: KOA });
  engine.install(server);
  if (patterns) {
    engine.build(patterns, assign({ model: false }, opts), setup.bind(this, engine, server, ctx));
  } else {
    setup(engine, server, ctx);
  }
}

function setup(engine, server, ctx, modules) {

  if (modules) {
    for (const m of modules) {
      if (isFunction(m.model) && (isString(m.name) || isSymbol(m.name))) {
        ctx[m.name] = m.model;
      }
    }
  }

  const app = server.init(ctx);
  inject(app, { name: APP });
  engine.install(app);
}
