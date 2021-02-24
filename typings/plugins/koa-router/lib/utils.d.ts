/**
 * 路由可选项
 */
export type RouteOpts = {
    /**
     * 实例属性名称
     */
    property: string | Symbol;
    /**
     * 路由方法名称
     */
    method: string;
    /**
     * 路由匹配路径
     */
    path: string;
    /**
     * 路由中间件
     */
    middlewares: Array<Function>;
};
/**
 * 路由集合可选项
 */
export type CollectionOpts = {
    /**
     * 路由匹配路径
     */
    path: string;
    /**
     * 路由中间件
     */
    middlewares: any;
};
/**
 * 路由可选项
 * @typedef {Object} RouteOpts
 * @property {String | Symbol} property 实例属性名称
 * @property {String} method 路由方法名称
 * @property {String} path 路由匹配路径
 * @property {Array<Function>} middlewares 路由中间件
 */
/**
 * 设置对象成员函数的路由信息
 * @param {any} target 目标对象
 * @param {RouteOpts} opts 可选项
 * @return {any} 目标对象
 */
export function route(target: any, opts: RouteOpts): any;
/**
 * 路由集合可选项
 * @typedef {Object} CollectionOpts
 * @property {String} path 路由匹配路径
 * @property {Object.<String,Array<Function>>} middlewares 路由中间件
 */
/**
 * 按照controller方式设置对象成员函数路由信息,即路由函数与同名成员函数匹配设置路由信息
 * @param {any} target 目标对象
 * @param {CollectionOpts} opts 可选项
 * @return {any} 目标对象
 */
export function controller(target: any, opts: CollectionOpts): any;
/**
 * 按照rest方式设置对象成员函数路由信息.
 * @param {any} target 目标对象
 * @param {CollectionOpts} opts 可选项
 * @return {any} 目标对象
 */
export function rest(target: any, opts: CollectionOpts): any;
