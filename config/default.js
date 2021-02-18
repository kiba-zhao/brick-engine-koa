/**
 * @fileOverview 默认配置
 * @name default.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

exports.koa = {
  patterns: 'koa/**/*.js',
  http: { msg: 'http listen on 3000', listen: { port: 3000, host: 'localhost' } }
};
