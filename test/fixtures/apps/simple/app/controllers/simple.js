/**
 * @fileOverview 测试路由
 * @name simple.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { route, controller, rest } = require('../../../../../..');
const { provide } = require('brick-engine');

class SimpleController {

  async inject(ctx) {
    ctx.body = await this.service.Simple.getConfig();
    ctx.status = 200;
  }

  index(ctx) {
    const { query } = ctx;
    ctx.body = { query, method: 'index' };
    ctx.status = 200;
  }

  allow(ctx) {
    ctx.set({
      Allow: 'GET, POST, DELETE, OPTIONS',
    });
    ctx.body = 'allow';
    ctx.status = 200;
  }

  clean(ctx) {
    ctx.status = 205;
  }

  async get(ctx) {
    const { query, params } = ctx;
    ctx.body = { query, params, method: 'get' };
    ctx.status = 200;
  }

  options(ctx) {
    ctx.set({
      Allow: 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS',
    });
    ctx.status = 200;
  }

  post(ctx) {
    const { query } = ctx;
    ctx.body = { query, body: ctx.request.body, method: 'post' };
    ctx.status = 201;
  }

  patch(ctx) {
    const { query, params } = ctx;
    ctx.body = { query, params, body: ctx.request.body, method: 'patch' };
    ctx.status = 200;
  }

  put(ctx) {
    const { query, params } = ctx;
    ctx.body = { query, params, body: ctx.request.body, method: 'put' };
    ctx.status = 200;
  }

  delete(ctx) {
    const { query, params } = ctx;
    ctx.body = { query, params };
    ctx.status = 204;
  }

}

module.exports = SimpleController;

function noop(ctx, next) {
  ctx.params = ctx.params || {};
  ctx.params.method = ctx.method.toLowerCase();
  next();
}


provide(module.exports, { property: 'service', dep: 'services' });
rest(module.exports, { path: '/simple', middlewares: { get: [ noop ] } });
controller(module.exports, { path: '/simple-ctrl', middlewares: { get: [ noop ] } });
route(module.exports, { property: 'inject', method: 'get', path: '/simple-inject', middlewares: [ noop ] });
