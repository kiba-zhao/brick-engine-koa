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

  provider.require([ 'boot', 'inject', 'config' ], (boot, inject, config) => setup(provider, boot, inject, config.koaRouter));

};

/**
 * 安装函数
 * @param {Provder} provider xprovde依赖模块提供器对象
 * @param {Object} boot xboot引导模块包
 * @param {Object} inject 注入模块包
 * @param {Object} config 配置内容
 */
function setup(provider, boot, inject, config) {

  const { patterns, opts, ...options } = config || {};
  const generators = getGenerators(boot);
  const router = createRouter(generators, options);
  if (!patterns) {
    provider.define('koa-router', [], router);
    return;
  }

  const store = { 'koa-router': router };
  const loader = boot.createBootLoader(patterns, boot.context, opts || {});
  const injector = inject.createInjector(loader, { store, addins: inject.addins });
  provider.define('koa-router', injector.deps, factory.bind(this, injector, router));

}

/**
 * 获取路由响应函数生成器
 * @param {Object} boot xboot引导模块包
 * @return {Array<Function>} 路由响应函数生成器
 */
function getGenerators(boot) {
  const generators = [];
  const loader = boot.createBootLoader('koa_router.js', boot.context);
  for (const item of loader) {
    if (!isFunction(item.module)) { continue; }
    generators.push(item.module);
  }
  return generators;
}


/**
 * 路由对象工厂函数
 * @param {Injector} injector inject模块中Injector类实例
 * @param {Router} router 路由实例
 * @param {Array<any>} args 依赖模块
 * @return {Router} 路由实例
 */
function factory(injector, router, ...args) {
  const modules = injector.create(...args);
  router.init(modules);
  return router;
}
