/**
 * @fileOverview 默认配置文件
 * @name default.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const faker = require('faker');

exports.koaJwt = {
  secret: faker.internet.password
};
