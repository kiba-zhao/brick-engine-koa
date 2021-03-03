export = KoaServer;
declare class KoaServer extends EventEmitter {
    constructor(opts: any);
    get app(): Koa<Koa.DefaultState, Koa.DefaultContext>;
    init(model: any): any;
    [OPTIONS]: any;
    [APP]: Koa<Koa.DefaultState, Koa.DefaultContext>;
}
import EventEmitter = require("node/events");
import Koa = require("koa");
declare const OPTIONS: unique symbol;
declare const APP: unique symbol;
