/**
 * @fileOverview 提供器入口
 * @name xprovide.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { createKoaServer } = require('.');

module.exports = provider => {

  provider.require(['boot', 'inject', 'config', 'log4js'], (boot, inject, config, log4js) => setup(provider, boot, inject, config.koa, log4js.get('koa')));

};

function setup(provider, boot, inject, config, logger) {

  if (!config) {
    return;
  }

  const server = createKoaServer({ logger, ...config });
  const store = { koa: server };
  const loader = boot.createBootLoader(config.patterns, boot.context, config.opts || {});
  const injector = inject.createInjector(loader, { store, addins: inject.addins });
  provider.require(injector.deps, init.bind(this, injector, server));

}

function init(injector, server, ...args) {
  const model = injector.build(...args);
  server.init(model);
}
