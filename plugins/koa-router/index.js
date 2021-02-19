/**
 * @fileOverview koa路由插件
 * @name index.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const Router = require('@koa/router');

exports.KoaRouter = Router;

function createKoaRouter(...arg) {
  return new Router(...args);
}

exports.createKoaRouter = createKoaRouter;

