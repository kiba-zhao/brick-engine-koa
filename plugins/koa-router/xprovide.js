/**
 * @fileOverview 提供器入口
 * @name xprovide.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { createKoaRouter } = require('.');

module.exports = provider => {

  provider.require(['boot', 'inject', 'config'], (boot, inject, config) => setup(provider, boot, inject, config.koaRouter));

};

function setup(provider, boot, inject, config) {

  const router = createKoaRouter(config);
  if (!config) {
    provider.define('koa-router', [], router);
    return;
  }

  const store = { 'koa-router': router };
  const loader = boot.createBootLoader(config.patterns, boot.context, config.opts || {});
  const injector = inject.createInjector(loader, { store });
  provider.define('koa-router', injector.deps, factory.bind(this, injector, router));

}

function factory(injector, router, ...args) {
  const modules = injector.create(...args);
  let value = modules.next();
  while (value.done === false) {
    value = modules.next();
  }
  return router;
}
