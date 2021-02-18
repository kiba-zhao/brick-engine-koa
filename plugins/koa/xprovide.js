/**
 * @fileOverview 提供器入口
 * @name xprovide.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { createKoaServer } = require('.');

module.exports = provider => {
  provider.require(['boot', 'inject', 'config', 'logger?'], (boot, inject, config, logger) => setup(provider, boot, inject, config.koa, logger));
};

function setup(provider, boot, inject, config, logger) {

  if (!config) {
    return;
  }

  const server = createKoaServer({ logger, ...config });
  provider.define('koa', { app: server.app });

  const loader = boot.createBootLoader(config.patterns, boot.context, config.opts || {});
  const injector = inject.createInjector(loader);
  provider.require(injector.deps, init.bind(this, injector, server));

}

function init(injector, server, ...args) {
  const model = injector.build(...args);
  server.init(model);
}
