/**
 * @fileOverview 默认配置文件
 * @name default.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

exports.koaJwt = {
  secret: 'asdfgh123',
};

exports.injectTestString = 'qwerty321';

exports.inject = {
  services: { patterns: 'services/**/*.js' },
};

exports.koaRouter = {
  plugins: { simple: '/plugins' },
};

exports.koaStatic = {
  plugins: { simple: '/public' },
};
