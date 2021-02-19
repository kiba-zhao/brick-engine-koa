/**
 * @fileOverview 跨域中间件
 * @name cors.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const cors = require('@koa/cors');

/**
 * @inject cors 注入模型名称
 * @dependency config 依赖配置文件
 */

module.exports = (config) => {

  const koaCors = config.koaCors;
  return koaCors ? cors(koaCors) : undefined;
};
