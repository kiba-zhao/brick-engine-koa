/**
 * @fileOverview 应用入口
 * @name app.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { inject } = require('brick-engine');
const { assign, isFunction, isString, isSymbol } = require('lodash');

const Router = require('./lib/router');
const KoaServer = require('./lib/koa_server');
const { KOA } = require('./lib/constants');

module.exports = engine => {

  const config = engine.config;
  if (!config.koa) {
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

function init(engine, router, modules) {

  if (modules) {
    router.init(modules);
  }
  const ctx = { router: router.middleware };
  const config = engine.config.koa;

  const { patterns, opts, ...options } = config;
  const server = new KoaServer(options);
  inject(server, { name: KOA });
  engine.install(server);
  if (patterns) {
    engine.build(patterns, assign({ model: false }, opts), setup.bind(this, server, ctx));
  } else {
    setup(server, ctx);
  }
}

function setup(server, ctx, modules) {

  if (modules) {
    for (const m of modules) {
      if (isFunction(m.model) && (isString(m.name) || isSymbol(m.name))) {
        ctx[m.name] = m.model;
      }
    }
  }

  server.init(ctx);
}
