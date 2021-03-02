/**
 * @fileOverview 插件控制器
 * @name simple_plugin.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { PLUGIN, controller, middleware } = require('../../../../../../..');

class SimplePlugin {

  get(ctx) {
    ctx.body = { params: ctx.params, query: ctx.query };
    ctx.status = 200;
  }

}

module.exports = SimplePlugin;

controller(SimplePlugin, { path: '/simple' });
middleware(SimplePlugin, item => (item.module[PLUGIN] ? noop(item.module[PLUGIN]) : undefined));

function noop(plugin) {
  return (ctx, next) => {
    ctx.params = ctx.params || {};
    ctx.params.plugin = plugin;
    next();
  };
}
