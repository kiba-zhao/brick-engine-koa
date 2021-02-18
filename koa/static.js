/**
 * @fileOverview 静态文件中间件
 * @name static.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const serve = require('koa-static');

/**
 * @inject static 注入模型名称
 * @dependency config 依赖配置文件
 */

module.exports = (config) => {

  const koaStatic = config.koaStatic;
  return koaStatic ? serve(koaStatic.root, koaStatic.opts) : undefined;
};
