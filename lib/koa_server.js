/**
 * @fileOverview koa服务端类
 * @name koa_server.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const http = require('http');
const https = require('https');
const http2 = require('http2');

const Koa = require('koa');

const OPTIONS = Symbol('options');
const APP = Symbol('app');

class KoaServer {
  constructor(opts) {

    this[OPTIONS] = opts;
    this[APP] = new Koa(opts.appOpts);
  }

  get app() {
    return this[APP];
  }

  init(model) {

    const opts = this[OPTIONS];
    const app = this[APP];
    const property = opts.middlewaresProperty;
    const middlewares = opts[property] || [];
    for (const key of middlewares) {
      const mw = model[key];
      if (mw) {
        app.use(mw);
      }
    }

    if (opts.http) { return start(app, http, opts.http, opts.logger); }
    if (opts.https) { return start(app, https, opts.https, opts.logger); }
    if (opts.http2) { return start(app, http2, opts.http2, opts.logger); }
    return null;
  }
}

module.exports = KoaServer;

function start(app, module, opts, logger) {
  let cb;
  if (opts.msg && logger) {
    cb = err => {
      if (!err) {
        logger.info(opts.msg);
      } else {
        logger.fatal(err);
      }
    };
  }
  const server = module.createServer(opts.server, app.callback());
  return server.listen(opts.listen, cb);
}
