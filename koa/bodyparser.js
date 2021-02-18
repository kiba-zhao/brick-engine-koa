/**
 * @fileOverview 请求body中间件
 * @name bodyparser.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const bodyParser = require('koa-bodyparser');

/**
 * @inject bodyParser 注入模型名称
 * @dependency config 依赖配置文件
 */

module.exports = (config) => {

  const koaBodyParser = config.koaBodyParser;
  return koaBodyParser ? bodyParser(koaBodyParser) : undefined;

};
