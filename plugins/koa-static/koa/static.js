/**
 * @fileOverview 静态文件中间件
 * @name static.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { inject } = require('brick-engine');
const { createKoaServe } = require('../');

module.exports = (boot, config) => {

  const { opts, patterns, ...options } = config.koaStatic || {};
  if (!patterns) {
    return undefined;
  }

  const _opts = Object.assign({ expand: false }, opts);
  const loader = boot.createBootLoader(patterns, boot.context, _opts);
  const serve = createKoaServe(loader, options);
  return serve.middleware;
};

inject(module.exports, { deps: [ 'boot', 'config' ], name: 'static' });
