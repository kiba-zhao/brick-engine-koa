/**
 * @fileOverview 模块包目录
 * @name index.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';
const { KOA } = require('./lib/constants');
const { route, controller, rest, middleware } = require('./lib/utils');

exports.KOA = KOA;

exports.route = route;
exports.controller = controller;
exports.rest = rest;
exports.middleware = middleware;
