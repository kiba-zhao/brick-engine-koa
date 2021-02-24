export = Router;
declare class Router {
    /**
     * 路由类构造函数
     * @param {Array<Function>} generators 路由响应函数生成器
     * @param {Object} opts KoaRouter类构造可选项．请参考koa-router文档
     */
    constructor(generators: Array<Function>, opts: any);
    /**
     * 获取middleware属性
     * @return {Function} 路由中间件
     */
    get middleware(): Function;
    /**
     * 初始化路由
     * @param {Loader} modules 注入的路由模块
     */
    init(modules: any): void;
}
declare namespace Router {
    export { RouteOpts };
}
/**
 * 路由可选项
 */
type RouteOpts = any;
