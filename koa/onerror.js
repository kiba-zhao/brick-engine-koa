/**
 * @fileOverview 异常处理中间件
 * @name onerror.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const onerror = require('koa-onerror');

/**
 * @dependency koa 依赖koa模块
 * @dependency config 依赖配置文件
 */

module.exports = (koa, config) => {

  const koaOnError = config.koaOnError;
  const app = koa.app;
  onerror(app, koaOnError);

};

