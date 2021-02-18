/**
 * @fileOverview 压缩中间件
 * @name compress.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const compress = require('koa-compress');

/**
 * @inject compress 注入模型名称
 * @dependency config 依赖配置文件
 */

module.exports = (config) => {

  const koaCompress = config.koaCompress;
  return koaCompress ? compress(koaCompress) : undefined;
};
