/**
 * @fileOverview 压缩中间件
 * @name compress.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { inject } = require('brick-engine');
const compress = require('koa-compress');

module.exports = (config) => {

  const koaCompress = config.koaCompress;
  return koaCompress ? compress(koaCompress) : undefined;
};

inject(module.exports, ['config'], 'compress');
