/**
 * @fileOverview 提供器入口
 * @name xprovide.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { createKoaServe } = require('.');

module.exports = provider => {
  provider.require(['boot', 'config'], (boot, config) => setup(provider, boot, config.koaStatic));
};

function setup(provider, boot, config) {
  const { opts, patterns, ...options } = config || {};
  if (!patterns) {
    return;
  }
  const _opts = Object.assign({ expand: false }, opts);
  const loader = boot.createBootLoader(patterns, boot.context, _opts);
  const serve = createKoaServe(loader, options);
  provider.define('koa-static', [], serve);
}
