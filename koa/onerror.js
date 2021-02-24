/**
 * @fileOverview 异常处理
 * @name onerror.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { inject } = require('brick-engine');
const onerror = require('koa-onerror');

module.exports = (koa, config) => {

  const koaOnError = config.koaOnError;
  const app = koa.app;
  onerror(app, koaOnError);

};

inject(module.exports, { deps: [ 'koa', 'config' ] });
