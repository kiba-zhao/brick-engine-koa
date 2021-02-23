/**
 * @fileOverview 静态文件插件类
 * @name serve.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const Static = require('koa-static');

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
  for (let item of loader) {
    const root = item.filePath;
    serves.push(Static(root, opts));
  }
  this[SERVES] = serves;
}
