/**
 * @fileOverview koa插件
 * @name index.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const KoaServer = require('./lib/koa_server');

exports.KoaServer = KoaServer;

function createKoaServer(...args) {
  return new KoaServer(...args);
}

exports.createKoaServer = createKoaServer;
