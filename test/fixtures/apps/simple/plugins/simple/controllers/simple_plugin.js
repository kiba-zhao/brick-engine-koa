/**
 * @fileOverview 插件控制器
 * @name simple_plugin.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { PLUGIN } = require('brick-engine');
const { controller, middleware } = require('../../../../../../..');

class SimplePlugin {

  get(ctx) {
    ctx.body = { params: ctx.params, query: ctx.query };
    ctx.status = 200;
  }

}

module.exports = SimplePlugin;

controller(SimplePlugin, { path: '/simple' });
middleware(SimplePlugin, noop);

function noop(target) {
  console.log(target);
  const plugin = target.module[PLUGIN];
  return (ctx, next) => {
    ctx.params = ctx.params || {};
    ctx.params.plugin = plugin;
    next();
  };
}
