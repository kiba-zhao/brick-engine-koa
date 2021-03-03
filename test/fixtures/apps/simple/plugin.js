/**
 * @fileOverview 插件配置
 * @name plugin.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const path = require('path');

exports.log4js = {
  package: 'brick-log4js',
};

exports.koa = {
  package: path.join('..', '..', '..', '..'),
  dependencies: [ 'log4js' ],
};

exports.simple = {
  package: path.join(__dirname, 'plugins', 'simple'),
};
