/**
 * @fileOverview koa扩展
 * @name koa.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

module.exports = item => {
  return item.plugin ? noop(item.plugin) : undefined;
};


function noop(plugin) {
  return (ctx, next) => {
    ctx.params = ctx.params || {};
    ctx.params.plugin = plugin;
    next();
  };

}
