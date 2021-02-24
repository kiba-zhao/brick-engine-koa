export = KoaServer;
declare class KoaServer {
    constructor(opts: any);
    get app(): Koa<Koa.DefaultState, Koa.DefaultContext>;
    init(model: any): void;
    [OPTIONS]: any;
    [APP]: Koa<Koa.DefaultState, Koa.DefaultContext>;
}
import Koa = require("koa");
declare const OPTIONS: unique symbol;
declare const APP: unique symbol;
