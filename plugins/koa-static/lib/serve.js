/**
 * @fileOverview 静态文件插件类
 * @name serve.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const Static = require('koa-static');
const mount = require('koa-mount');

const SERVES = Symbol('serves');
class Serve {
  constructor(loader, opts) {
    prepare(loader, opts);
  }

  get serves() {
    return this[SERVES];
  }
}

module.exports = Serve;

function prepare(loader, opts) {
  const serves = [];
  const { plugins, ...options } = opts;
  for (let item of loader) {
    const root = item.filePath;
    let mw = Static(root, options);
    const path = item.plugin ? plugins[item.plugins] : undefined;
    if (path) {
      mw = mount(path, mw);
    }
    serves.push(mw);
  }
  this[SERVES] = serves;
}
