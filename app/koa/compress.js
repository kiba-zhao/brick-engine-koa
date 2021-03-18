/**
 * @fileOverview 压缩中间件
 * @name compress.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { ENGINE, inject } = require('brick-engine');
const compress = require('koa-compress');

module.exports = engine => {

  const config = engine.config;
  const koaCompress = config.koaCompress;
  return koaCompress ? compress(koaCompress) : undefined;
};

inject(module.exports, { deps: [ ENGINE ], name: 'compress' });
