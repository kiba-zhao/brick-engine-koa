/**
 * @fileOverview 静态文件中间件
 * @name static.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const compose = require('koa-compose');

/**
 * @inject static 注入模型名称
 * @dependency koa-static 依赖配置文件
 */

module.exports = (serve) => {

  const { serves } = serve;
  return serves.length > 0 ? compose(serves) : undefined;
};
