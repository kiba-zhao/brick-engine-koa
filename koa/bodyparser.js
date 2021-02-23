/**
 * @fileOverview 请求body中间件
 * @name bodyparser.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { inject } = require('brick-engine');
const bodyParser = require('koa-bodyparser');

module.exports = (config) => {

  const koaBodyParser = config.koaBodyParser;
  return koaBodyParser ? bodyParser(koaBodyParser) : undefined;

};

inject(module.exports, ['config'], 'bodyParser');
