/**
 * @fileOverview 本地配置
 * @name local.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

exports.log4js = {
  configure: {
    categories: {
      default: { level: 'trace' },
      koa: { level: 'trace' }
    }
  }
};
