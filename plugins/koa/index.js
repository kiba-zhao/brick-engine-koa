/**
 * @fileOverview koa插件
 * @name index.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const KoaServer = require('./lib/koa_server');
const { KOA, APP } = require('./lib/constants');

exports.KoaServer = KoaServer;

exports.KOA = KOA;
exports.APP = APP;
