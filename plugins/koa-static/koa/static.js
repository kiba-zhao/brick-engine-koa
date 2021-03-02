/**
 * @fileOverview 静态文件中间件
 * @name static.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { ENGINE, inject } = require('brick-engine');
const { createKoaServe } = require('../');

module.exports = engine => {

  const config = engine.config;
  const { opts, patterns, ...options } = config.koaStatic || {};
  if (!patterns) {
    return undefined;
  }

  const _opts = Object.assign({ expand: false }, opts);
  const modules = engine.load(patterns, _opts);
  const serve = createKoaServe(modules, options);
  return serve.middleware;
};

inject(module.exports, { deps: [ ENGINE ], name: 'static' });
