/**
 * @fileOverview 静态文件插件
 * @name index.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const Serve = require('./lib/serve');

exports.KoaServe = Serve;

function createKoaServe(...args) {
  return new Serve(...args);
}

exports.createKoaServe = createKoaServe;
