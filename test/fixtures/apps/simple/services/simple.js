/**
 * @fileOverview 服务模型
 * @name simple.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { ENGINE, provide, inject } = require('../../../../..');

class SimpleService {

  async getConfig() {
    return this.config.injectTestString;
  }
}

module.exports = SimpleService;

inject(module.exports, { name: 'Simple' });
provide(module.exports, { property: 'config', dep: { id: ENGINE, transform: _ => _.config } });
