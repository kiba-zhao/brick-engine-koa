/**
 * @fileOverview 默认配置
 * @name default.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const path = require('path');

exports.log4js = {
  configure: {
    appenders: {
      out: { type: "stdout" },
      koa: {
        type: "dateFile",
        filename: path.join(process.cwd(), 'logs', `koa.log`),
        keepFileExt: true
      },
      app: {
        type: "dateFile",
        filename: path.join(process.cwd(), 'logs', `app.log`),
        keepFileExt: true
      }
    },
    categories: {
      default: { appenders: ['app', 'out'], level: 'info' },
      koa: { appenders: ['koa', 'out'], level: 'info' }
    }
  }
};

exports.koa = {
  patterns: 'koa/**/*.js',
  http: { msg: 'http listen on 3000', listen: { port: 3000, host: 'localhost' } },
  middlewares: ['cors', 'compress', 'static', 'bodyParser', 'override', 'router']
};

exports.koaCors = {};

exports.koaCompress = {
  threshold: 2048
};

exports.koaStatic = {
  patterns: 'public/'
};

exports.koaBodyParser = {};

exports.koaOverride = {};

exports.koaRouter = {
  patterns: 'controllers/**/*.js'
};
