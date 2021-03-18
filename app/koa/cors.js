/**
 * @fileOverview 跨域中间件
 * @name cors.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { ENGINE, inject } = require('brick-engine');
const cors = require('@koa/cors');

module.exports = engine => {

  const config = engine.config;
  const koaCors = config.koaCors;
  return koaCors ? cors(koaCors) : undefined;
};

inject(module.exports, { deps: [ ENGINE ], name: 'cors' });
