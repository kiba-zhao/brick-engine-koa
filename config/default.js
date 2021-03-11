/**
 * @fileOverview 默认配置
 * @name default.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

exports.koa = {
  patterns: 'koa/**/*.js',
  http: { listen: { port: 3000, host: 'localhost' } },
  middlewaresProperty: 'middlewares',
  middlewares: [ 'cors', 'compress', 'static', 'bodyParser', 'override', 'router' ],
};

exports.koaCors = {};

exports.koaCompress = {
  threshold: 2048,
};

exports.koaStatic = {
  patterns: 'public/',
};

exports.koaBodyParser = {};

exports.koaOverride = {};

exports.koaOnError = {};

exports.koaRouter = {
  patterns: 'controllers/**/*.js',
};
