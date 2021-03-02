/**
 * @fileOverview 静态文件插件类
 * @name serve.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const assert = require('assert');
const Static = require('koa-static');
const mount = require('koa-mount');
const compose = require('koa-compose');
const { isObject } = require('lodash');

const MIDDLEWARE = Symbol('middleware');

class Serve {
  /**
   * 静态服务构造函数
   * @param {Loader} loader 模块加载器
   * @param {Object} opts 构造koa-static可选项目.请参考koa-static文档
   */
  constructor(loader, opts) {
    assert(loader, '[koa-static] Serve Error: wrong loader');
    assert(isObject(opts), '[koa-static] Serve Error: wrong opts');
    assert(opts.plugins === undefined || isObject(opts.plugins), '[koa-static] Serve Error: wrong opts.plugins');
    prepare(this, loader, opts);
  }

  /**
   * 获取middleware函数
   * @return {Function} 静态文件服务中间件
   */
  get middleware() {
    return this[MIDDLEWARE];
  }
}

module.exports = Serve;

/**
 * 预处理函数
 * @param {Serve} serve 静态服务类实例
 * @param {Loader} loader 模块加载器
 * @param {Object} opts 可选项
 */
function prepare(serve, loader, opts) {
  const serves = [];
  const { plugins, path: prefix, ...options } = opts;
  for (const item of loader) {
    const root = item.filePath;
    let mw = Static(root, options);
    const path = item.plugin ? plugins[item.plugin] : undefined;
    if (path) {
      mw = mount(path, mw);
    } else if (prefix) {
      mw = mount(prefix, mw);
    }
    serves.push(mw);
  }
  serve[MIDDLEWARE] = compose(serves);
}
