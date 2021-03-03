/**
 * @fileOverview 默认配置
 * @name default.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { KOA } = require('../lib/constants');

exports[KOA] = {
  patterns: 'koa/**/*.js',
  http: { msg: 'http listen on 3000', listen: { port: 3000, host: 'localhost' } },
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

exports.koaRouter = {
  patterns: 'controllers/**/*.js',
};
