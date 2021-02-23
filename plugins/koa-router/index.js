/**
 * @fileOverview koa路由插件
 * @name index.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { route, controller, rest } = require('./lib/utils');
const Router = require('lib/router');

exports.Router = Router;

function createRouter(...args) {
  return new Router(...args);
}

exports.createRouter = createRouter;

exports.route = route;
exports.controller = controller;
exports.rest = rest;
