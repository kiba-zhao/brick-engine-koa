/**
 * @fileOverview 扩展methods支持中间件
 * @name override.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { ENGINE, inject } = require('brick-engine');
const override = require('koa-override');

module.exports = engine => {

  const config = engine.config;
  const koaOverride = config.koaOverride;
  return koaOverride ? override(koaOverride) : undefined;

};

inject(module.exports, { deps: [ ENGINE ], name: 'override' });
