/**
 * @fileOverview 异常处理
 * @name onerror.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { ENGINE, inject } = require('brick-engine');
const { KOA } = require('../../lib/constants');
const onerror = require('koa-onerror');

module.exports = (koa, engine) => {

  const config = engine.config;
  const koaOnError = config.koaOnError;
  const app = koa.app;
  if (koaOnError) {
    onerror(app, koaOnError);
  }

};

inject(module.exports, { deps: [ KOA, ENGINE ] });
