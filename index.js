/**
 * @fileOverview 模块包目录
 * @name index.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';
const engine = require('brick-engine');
const { logger } = require('brick-log4js');
const { APP } = require('./lib/constants');
const { route, controller, rest, middleware } = require('./lib/utils');

exports.APP = APP;

exports.logger = logger;

exports.route = route;
exports.controller = controller;
exports.rest = rest;
exports.middleware = middleware;

Object.assign(module.exports, engine);
