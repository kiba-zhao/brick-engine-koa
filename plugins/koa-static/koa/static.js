/**
 * @fileOverview 静态文件中间件
 * @name static.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { inject } = require('brick-engine');
const compose = require('koa-compose');

module.exports = (serve) => {

  const { serves } = serve;
  return serves.length > 0 ? compose(serves) : undefined;
};

inject(module.exports, ['koa-static'], 'static');
