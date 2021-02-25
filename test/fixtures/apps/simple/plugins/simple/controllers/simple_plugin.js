/**
 * @fileOverview 插件控制器
 * @name simple_plugin.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { controller } = require('../../../../../../..');

class SimplePlugin {

  get(ctx) {
    ctx.body = { params: ctx.params, query: ctx.query };
    ctx.status = 200;
  }

}

module.exports = SimplePlugin;

controller(SimplePlugin, { path: '/simple' });
