/**
 * @fileOverview 应用入口
 * @name app.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { ENGINE, inject } = require('brick-engine');
const { LOG4JS } = require('brick-log4js');
const { assign, isFunction, isString, isSymbol } = require('lodash');

const { KOA, APP } = require('./lib/constants');
const KoaServer = require('./lib/koa_server');

module.exports = (engine, log4js) => {

  const config = engine.config[KOA];
  if (!config) {
    return;
  }

  const { patterns, opts, ...options } = config;
  const logger = log4js.getLogger('koa');
  const server = new KoaServer(assign({ logger }, options));
  inject(server, { name: KOA });
  engine.install(server);

  if (patterns) {
    engine.build(patterns, assign({ model: false }, opts), setup.bind(this, engine, server));
  } else {
    setup(engine, server);
  }

};

inject(module.exports, { deps: [ ENGINE, LOG4JS ] });

function setup(engine, server, modules) {
  const ctx = {};
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
