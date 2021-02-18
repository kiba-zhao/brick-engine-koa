/**
 * @fileOverview 视图中间件
 * @name views.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const views = require('koa-views');

/**
 * @inject views 注入模型名称
 * @dependency config 依赖配置文件
 */

module.exports = (config) => {

  const koaViews = config.koaViews;
  return koaViews ? views(koaViews.root, koaViews.opts) : undefined;

};
