/**
 * @fileOverview 扩展methods支持中间件
 * @name override.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { inject } = require('brick-engine');
const override = require('koa-override');

module.exports = (config) => {

  const koaOverride = config.koaOverride;
  return koaOverride ? override(koaOverride) : undefined;

};

inject(module.exports, ['config'], 'override');
