/**
 * @fileOverview 模块包目录
 * @name index.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { route, controller, rest } = require('./plugins/koa-router');
const { inject, provide } = require('brick-engine');
const { logger } = require('brick-log4js');

exports.inject = inject;
exports.provide = provide;
exports.logger = logger;

exports.route = route;
exports.controller = controller;
exports.rest = rest;
