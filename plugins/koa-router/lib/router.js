/**
 * @fileOverview 路由类
 * @name router.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const assert = require('assert');
const { assign, isArray, isObject, isFunction } = require('lodash');
const KoaRouter = require('@koa/router');
const compose = require('koa-compose');
const { PLUGIN } = require('brick-engine');

const { KOA_ROUTES, KOA_CONTROLLERS, KOA_RESTS, KOA_MIDDLEWARE } = require('./constants');

const PLUGINS = Symbol('PLUGINS');
const ROUTER = Symbol('ROUTER');
const MIDDLEWARE = Symbol('MIDDLEWARE');

class Router {
  /**
   * 路由类构造函数
   * @param {Object} opts KoaRouter类构造可选项．请参考koa-router文档
   */
  constructor(opts) {

    assert(isObject(opts), '[koa-router] Router Error: wrong opts');
    assert(opts.plugins === undefined || isObject(opts.plugins), '[koa-router] Router Error: wrong opts.plugins');

    const { plugins, ...options } = opts;
    this[ROUTER] = new KoaRouter(options);
    this[PLUGINS] = plugins || {};
  }

  /**
   * 获取middleware属性
   * @return {Function} 路由中间件
   */
  get middleware() {
    if (!this[MIDDLEWARE]) {
      const router = this[ROUTER];
      this[MIDDLEWARE] = compose([ router.routes(), router.allowedMethods() ]);
    }
    return this[MIDDLEWARE];
  }

  /**
   * 初始化路由
   * @param {Loader} modules 注入的路由模块
   */
  init(modules) {
    const router = this[ROUTER];
    const plugins = this[PLUGINS];

    for (const item of modules) {
      const plugin = item.module[PLUGIN];
      const prefix = plugin ? plugins[plugin] : undefined;
      initRoute(router, item, prefix);
      initController(router, item, prefix);
      initRest(router, item, prefix);
    }
  }
}

module.exports = Router;

/**
 *
 * @external "RouteOpts"
 * @see {@link ./utils|RouteOpts}
 */

/**
 * 路由可选项
 * @typedef {Object} RouteOpts
 * @extends external:RouteOpts
 */

/**
 * 注册路由函数
 * @param {KoaRouter} router 路由对象
 * @param {Object} item 注入对象
 * @param {RouteOpts} opts 路由信息可选项
 */
function register(router, item, opts) {
  const { property, method, path, middlewares } = opts;

  const target = item.model;
  let action = target[property];
  if (!isFunction(router[method]) || !isFunction(action)) { return; }

  action = action.bind(target);
  const factories = item.module[KOA_MIDDLEWARE] || [];
  const mws = [];
  for (const factory of factories) {
    const mw = factory(item, opts);
    if (isFunction(mw)) {
      mws.push(mw);
    }
  }

  if (isArray(middlewares) && middlewares.length > 0) {
    router[method](path, ...mws, ...middlewares, action);
  } else {
    router[method](path, ...mws, action);
  }
}


/**
 * 初始化路由信息
 * @param {KoaRouter} router 路由对象
 * @param {Object} item 注入对象
 * @param {String} prefix 路由前缀
 */
function initRoute(router, item, prefix) {

  const routes = item.module[KOA_ROUTES] || [];
  for (let opts of routes) {
    if (prefix) {
      opts = assign({ path: prefix + opts.path }, opts);
    }
    register(router, item, opts);
  }
}

/**
 * 初始化控制器路由信息
 * @param {KoaRouter} router 路由对象
 * @param {Object} item 注入对象
 * @param {Array<Function>} extensions 路由扩展
 * @param {String} prefix 路由前缀
 */
function initController(router, item, prefix) {
  const controllers = item.module[KOA_CONTROLLERS] || [];
  for (const { path, middlewares } of controllers) {
    const methods = router.methods;
    const mws = middlewares || {};
    for (const method of methods) {
      const m = method.toLowerCase();
      if (m === 'head') { continue; }
      const opts = { path, middlewares: mws[m], method: m, property: m };
      if (prefix) {
        opts.path = prefix + opts.path;
      }
      register(router, item, opts);
    }
  }
}

const REST_RESOURCE_PATH = '/:id';
const REST_PROPERTIES = {
  index: { method: 'get' },
  post: { method: 'post' },
  get: { method: 'get', path: REST_RESOURCE_PATH },
  put: { method: 'put', path: REST_RESOURCE_PATH },
  patch: { method: 'patch', path: REST_RESOURCE_PATH },
  delete: { method: 'delete', path: REST_RESOURCE_PATH },
  clean: { method: 'delete' },
  options: { method: 'options', path: REST_RESOURCE_PATH },
  allow: { method: 'options' },
};

/**
 * 初始化rest控制器路由
 * @param {KoaRouter} router 路由对象
 * @param {Object} item 注入对象
 * @param {String} prefix 路由前缀
 */
function initRest(router, item, prefix) {
  const rests = item.module[KOA_RESTS] || [];
  for (const { path, middlewares } of rests) {
    const mws = middlewares || {};
    for (const property in REST_PROPERTIES) {
      const { path: suffix, method } = REST_PROPERTIES[property];
      const opts = { path, middlewares: mws[property], method, property };
      if (suffix) {
        opts.path = opts.path + suffix;
      }
      if (prefix) {
        opts.path = prefix + opts.path;
      }
      register(router, item, opts);
    }
  }
}
