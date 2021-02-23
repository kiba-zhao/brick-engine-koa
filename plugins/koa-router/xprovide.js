/**
 * @fileOverview 提供器入口
 * @name xprovide.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { isFunction } = require('lodash');
const { createRouter } = require('.');

module.exports = provider => {

  provider.require(['boot', 'inject', 'config'], (boot, inject, config) => setup(provider, boot, inject, config.koaRouter));

};

function setup(provider, boot, inject, config) {

  const generators = getGenerators(boot);
  const router = createRouter(generators, config.opts);
  if (!config) {
    provider.define('koa-router', [], router);
    return;
  }

  const store = { 'koa-router': router };
  const loader = boot.createBootLoader(config.patterns, boot.context, config.loaderOpts || {});
  const injector = inject.createInjector(loader, { store, addins: inject.addins });
  provider.define('koa-router', injector.deps, factory.bind(this, injector, router));

}

function getGenerators(boot) {
  const generators = [];
  const loader = boot.createBootLoader('koa_router.js', boot.context);
  for (const item of loader) {
    if (!isFunction(item.module)) { continue; }
    generators.push(item.module);
  }
  return generators;
}


function factory(injector, router, ...args) {
  const modules = injector.create(...args);
  router.init(modules);
  return router;
}
