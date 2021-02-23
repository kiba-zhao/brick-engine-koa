/**
 * @fileOverview 路由类
 * @name router.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';
const { isArray, isNumber, isFunction } = require('lodash');
const KoaRouter = require('@koa/router');
const compose = require('koa-compose');

const { KOA_ROUTES, KOA_CONTROLLERS, KOA_RESTS } = require('./constants');

const GENERATORS = Symbol('GENERATORS');
const ROUTER = Symbol('router');
class Router {
  constructor(generators, opts) {
    this[GENERATORS] = generators.sort(sortGenerators);
    this[ROUTER] = new KoaRouter(opts);
  }

  get middleware() {
    const router = this[ROUTER];
    return compose(router.routes(), router.allowedMethods());
  }

  init(modules) {
    const router = this[ROUTER];
    const generators = this[GENERATORS];
    for (let item of modules) {
      const mws = generateMiddlewares(item, generators);
      initRoute(router, item, mws);
      initController(router, item, mws);
      initRest(router, item, mws);
    }
  }
}

module.exports = Router;

function register(router, target, property, method, path, middlewares) {
  if (!isFunction(router[method]) || !isFunction(target[property]))
    return;

  const mws = [];
  for (let middleware of middlewares) {
    if (middleware[property]) {
      mws.push(...middleware[property]);
    }
  }

  router[method](path, ...mws, target[property].bind(target));
}


function initRoute(router, item, middlewares) {
  const routes = item.factory[KOA_ROUTES] || [];
  for (let route of routes) {
    const { property, method, path } = route;
    register(router, item.model, property, method, path, middlewares);
  }
}

function initController(router, item, middlewares) {
  const controllers = item.factory[KOA_CONTROLLERS];
  for (let path of controllers) {
    const methods = router.methods;
    for (let method of methods) {
      const m = method.toLowerCase();
      register(router, item.model, m, m, path, middlewares);
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
  head: { method: 'head', path: REST_RESOURCE_PATH },
  options: { method: 'options', path: REST_RESOURCE_PATH },
  allow: { method: 'options' },
};
function initRest(router, item, middlewares) {
  const rests = item.factory[KOA_RESTS];
  for (let root of rests) {
    for (let property in REST_PROPERTIES) {
      const { path, method } = REST_PROPERTIES[property];
      const _path = path ? root + path : root;
      register(router, item.model, property, method, _path, middlewares);
    }
  }
}

function generateMiddlewares(item, generators) {

  const mws = [];
  for (let generate of generators) {
    const middlewares = generate(item.factory);
    if (isArray(middlewares) && middlewares.length > 0) {
      mws.push(...middlewares);
    }
  }
  return mws;
}

function sortGenerators(prev, next) {
  const prevSeq = isNumber(prev.seq) ? prev.seq : Number.MIN_VALUE;
  const nextSeq = isNumber(next.seq) ? next.seq : Number.MIN_VALUE;
  return prevSeq - nextSeq;
}
