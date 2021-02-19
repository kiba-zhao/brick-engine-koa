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
  const opts = Object.assign({}, config.opts, { onlyFiles: false, expandDirectories: false });
  const loader = boot.createBootLoader(config.patterns, boot.context, opts);
  const serve = createKoaServe(loader, config.opts);
  provider.define('koa-static', [], serve);
}
