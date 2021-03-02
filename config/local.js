/**
 * @fileOverview 本地配置
 * @name local.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { LOG4JS } = require('brick-log4js');

exports[LOG4JS] = {
  categories: {
    default: { level: 'trace' },
    koa: { level: 'trace' },
  },
};
