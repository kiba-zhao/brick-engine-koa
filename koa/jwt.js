/**
 * @fileOverview jwt中间件
 * @name jwt.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const jwt = require('koa-jwt');

/**
 * @inject jwt 注入模型名称
 * @dependency config 依赖配置文件
 */
module.exports = (config) => {

  const koaJwt = config.koaJwt;
  return koaJwt ? jwt(koaJwt) : undefined;
};
