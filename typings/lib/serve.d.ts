export = Serve;
declare class Serve {
    /**
     * 静态服务构造函数
     * @param {Loader} loader 模块加载器
     * @param {Object} opts 构造koa-static可选项目.请参考koa-static文档
     */
    constructor(loader: any, opts: any);
    /**
     * 获取middleware函数
     * @return {Function} 静态文件服务中间件
     */
    get middleware(): Function;
}
