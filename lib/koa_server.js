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
const SERVER = Symbol('server');

class KoaServer extends EventEmitter {
  constructor(opts) {
    super();
    this[OPTIONS] = opts;
    this[APP] = new Koa(opts.appOpts);
  }

  get app() {
    return this[APP];
  }

  get server() {
    return this[SERVER];
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

    if (opts.http) { start(this, http, opts.http); } else if (opts.https) { start(this, https, opts.https); } else if (opts.http2) { start(this, http2, opts.http2); }
  }
}

module.exports = KoaServer;

function start(koaServer, module, opts) {
  const app = koaServer.app;
  const server = module.createServer(opts.server, app.callback());
  koaServer[SERVER] = server;
  server.listen(opts.listen, (...args) => {
    koaServer.emit('start', ...args);
  });
}
