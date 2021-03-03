/**
 * @fileOverview koa服务端类
 * @name koa_server.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const EventEmitter = require('events');
const http = require('http');
const https = require('https');
const http2 = require('http2');

const Koa = require('koa');

const OPTIONS = Symbol('options');
const APP = Symbol('app');

class KoaServer extends EventEmitter {
  constructor(opts) {
    super();
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

    if (opts.http) { return start(this, http, opts.http); }
    if (opts.https) { return start(this, https, opts.https); }
    if (opts.http2) { return start(this, http2, opts.http2); }
    return null;
  }
}

module.exports = KoaServer;

function start(koaServer, module, opts) {
  const app = koaServer.app;
  const server = module.createServer(opts.server, app.callback());
  return server.listen(opts.listen, (...args) => {
    koaServer.emit('start', ...args);
  });
}
