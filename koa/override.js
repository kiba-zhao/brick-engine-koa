/**
 * @fileOverview 扩展methods支持中间件
 * @name override.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const override = require('koa-override');

/**
 * @inject override 注入模型名称
 * @dependency config 依赖配置文件
 */
module.exports = (config) => {

  const koaOverride = config.koaOverride;
  return koaOverride ? override(koaOverride) : undefined;

};
