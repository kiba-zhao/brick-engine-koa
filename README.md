# brick-adapter-koa #
[brick-engine](https://github.com/kiba-zhao/brick-engine)的[koa](https://github.com/koajs/koa#readme)框架适配插件.用于支持使用[koa](https://github.com/koajs/koa#readme)框架进行http项目开发.

## Install ##

``` shell
npm install --save brick-adapter-koa

```

## Usage ##
设置plugin.js，注册启用插件

``` javascript
// {cwd}/plugin.js
// {cwd}/node_modules/{xxx engine}/plugin.js

exports.adapterKoa = {
    package:'brick-adapter-koa'
};
```

### Configuration ###
插件提供了架设http应用所需的基本功能，这些功能大多通过koa中间件来实现．中间件的参数，通常通过配置文件来设置．

#### Koa ####
koa框架启动配置

``` javascript
// {cwd}/config/*.js
// {cwd}/node_modules/{xxx engine}/config/*.js
// {cwd}/node_modules/{xxx plugin}/config/*.js

const {KOA} = require('brick-adapter-koa');

exports[KOA] = {
  // 中间件文件匹配规则．插件将加载目录下文件模块构建koa中间件
  patterns: 'koa/**/*.js',
  // 中间件文件加载可选参数
  opts:{},
  // http服务配置,详情请参考http,https,http2对应createServer函数的options参数
  server:{},
  // http服务启动配置
  http: { 
    // 启动后日志记录信息
    msg: 'http listen on 3000', 
    // 启动参数
    listen: { port: 3000, host: 'localhost' } 
  },
  // https服务启动配置,内容与http相同
  https:null,
  // http2服务启动配置,内容与http相同
  http2:null,
  // 中间件使用列表的属性名称: 当从配置里获取列表时候，根据此属性设置的属性名来读取，即：config[config.middlewaresProperty]
  middlewaresProperty: 'middlewares',
  // 中间件使用列表: 插件根据此列表顺序，挂载使用中间件.
  middlewares: [ 'cors', 'compress', 'static', 'bodyParser', 'override', 'router' ],
};

```

#### Cors ####
跨越插件,参数详细请参考：[@koa/cors](https://github.com/koajs/cors)

``` javascript
// {cwd}/config/*.js
// {cwd}/node_modules/{xxx engine}/config/*.js
// {cwd}/node_modules/{xxx plugin}/config/*.js

exports.koaCors = {};
```

#### Compress ####
响应内容压缩插件,参数详细请参考：[koa-compress](https://github.com/koajs/compress#readme)

``` javascript
// {cwd}/config/*.js
// {cwd}/node_modules/{xxx engine}/config/*.js
// {cwd}/node_modules/{xxx plugin}/config/*.js

exports.koaCompress = {};
```

#### Static ####
静态服务插件,部分参数详细请参考：[koa-static](https://github.com/koajs/static#readme)

``` javascript
// {cwd}/config/*.js
// {cwd}/node_modules/{xxx engine}/config/*.js
// {cwd}/node_modules/{xxx plugin}/config/*.js

exports.koaStatic = {
  // 静态文件目录匹配规则
  patterns: 'public/',
  // 静态文件目录加载可选参数
  opts:{},
  // 匹配路径
  path:'/xxx',
  // 插件静态文件挂载到指定路径下
  // { [plugin.js中的插件key] : '匹配路径'}
  plugins:{
    simple: '/public'
  },
  // koa-static构建参数
  ...
};
```

#### BodyParser ####
请求内容解析插件,参数详情请参考：[koa-bodyparser](https://github.com/koajs/body-parser)

``` javascript
// {cwd}/config/*.js
// {cwd}/node_modules/{xxx engine}/config/*.js
// {cwd}/node_modules/{xxx plugin}/config/*.js

exports.koaBodyParser = { ... }
```

#### Override ####
methods扩展支持插件,参数详情请参考：[koa-override](https://github.com/node-modules/koa-override)

``` javascript
// {cwd}/config/*.js
// {cwd}/node_modules/{xxx engine}/config/*.js
// {cwd}/node_modules/{xxx plugin}/config/*.js

exports.koaOverride = { ... }

```

#### Router ####
路由功能插件,部分参数请参考:[@koa/router](https://github.com/koajs/router)中router的构建参数

``` javascript
// {cwd}/config/*.js
// {cwd}/node_modules/{xxx engine}/config/*.js
// {cwd}/node_modules/{xxx plugin}/config/*.js

exports.koaRouter = {
  // 路由功能文件匹配规则
  patterns: 'controllers/**/*.js',
  // 路由功能文件加载可选参数
  opts:{},
  // 路由功能挂载到指定路径下
  // { [plugin.js中的插件key] : '匹配路径'}
  plugins: { simple: '/plugins' },
  // koa-router构建参数
  ...
};
```

#### OnError ####
异常处理插件,参数详情请参考:[koa-onerror](https://github.com/koajs/onerror)

``` javascript
// {cwd}/config/*.js
// {cwd}/node_modules/{xxx engine}/config/*.js
// {cwd}/node_modules/{xxx plugin}/config/*.js

exports.koaOnError = {
  // koa-onerror构建参数
  ...
};
```

### API ###

**KOA**
插件常量，用于配置的key，以及koa插件server实例在engine.install中的name.

**APP**
koa插件server启动应用常量，通常用于supertest测试时inject为依赖,使用engine.use获取app对象．

``` javascript
const { APP } = require('brick-adapter-koa');

const fn = _ => { app = _; done(); };
inject(fn, { deps: [ APP ] });
engine.use(fn);
```

#### route(target,opts) ####
路由信息设置函数

**target**
路由功能对象的构建方法

**opts**
路由可选参数

* opts.property {String | Symbol}: 路由功能对象的成员功能名称
* opts.method {String}: 匹配的路由method
* opts.path {String}: 匹配的路由路径
* opts.middlewares {Array<Function>}: 路由挂载的中间件

``` javascript
const {route} = require('brick-adapter-koa');

class SimpleController {}
module.exports = SimpleController;

route(module.exports, { property: 'inject', method: 'get', path: '/simple-inject', middlewares: [ noop ] });
```

#### controller(target,opts) ####
控制器路由设置函数,将整个对象按照method调用对应名称的成员功能.对应关系如下：

| method  | property | 备注               |
|:--------|:---------|:-------------------|
| get     | get      |                    |
| head    | get      | body不返回实际内容 |
| post    | post     |                    |
| put     | put      |                    |
| patch   | patch    |                    |
| delete  | delete   |                    |
| options | options  |                    |

**target**
路由功能对象的构建方法

**opts**
控制器可选参数

* opts.path {String}: 匹配的路由路径
* opts.middlewares {{[key:{String}]:Array<Function>}}: 路由挂载的中间件

``` javascript
const { controller } = require('brick-adapter-koa');

class SimpleController {}
module.exports = SimpleController;

controller(module.exports, { path: '/simple-ctrl', middlewares: { get: [ noop ] } });
```

#### rest(target,opts) ####
restful控制器,将整个对象按照path与method调用对应名称的成员功能.对应关系如下：

| path | methood | property | 备注               |
|:-----|:--------|:---------|:-------------------|
|      | get     | index    |                    |
|      | head    | index    | body不返回实际内容 |
|      | post    | post     |                    |
| /:id | get     | get      |                    |
| /:id | head    | get      | body不返回实际内容 |
| /:id | put     | put      |                    |
| /:id | patch   | patch    |                    |
| /:id | delete  | delete   |                    |
|      | delete  | clean    |                    |
| /:id | options | options  |                    |
|      | options | allow    |                    |

**target**
路由功能对象的构建方法

**opts**
restful控制器可选参数

* opts.path {String}: 匹配的路由路径
* opts.middlewares {{[key:{String}]:Array<Function>}}: 路由挂载的中间件

``` javascript
const { rest } = require('brick-adapter-koa');

class SimpleController {}
module.exports = SimpleController;

rest(module.exports, { path: '/simple', middlewares: { get: [ noop ] } });
```

#### middleware(target,factory) ####
中间件扩展功能函数,用于注册生成中间件的工厂函数.该工厂函数会在注册路由时候，用于生成koa中间件.

**target**
路由功能对象的构建方法

##### factory(moduleTarget,opts) #####
中间件扩展生成工厂

**moduleTarget**
模块对象
* moduleTarget.name {String | Symbol} : 模块名称
* moduleTarget.module {Function | Class | any} : 模块构建方法
* moduleTarget.model {any} : 模块对象

**opts**
当前路由可选项

* opts.property {String | Symbol}: 路由功能对象的成员功能名称
* opts.method {String}: 匹配的路由method
* opts.path {String}: 匹配的路由路径
* opts.middlewares {Array<Function>}: 路由挂载的中间件

``` javascript
const { PLUGIN, middleware } = require('brick-adapter-koa');

class SimpleController {}
module.exports = SimpleController;

middleware(SimpleController, item => (item.module[PLUGIN] ? noop(item.module[PLUGIN]) : undefined));

function noop(plugin) {
  return (ctx, next) => {
    ctx.params = ctx.params || {};
    ctx.params.plugin = plugin;
    next();
  };
}

```

## Documentations ##
使用`jsdoc`生成注释文档

``` shell
git clone https://github.com/kiba-zhao/brick-adapter-koa.git
cd brick-adapter-koa
npm install
npm run docs
open docs/index.html
```

## License ##
[MIT](LICENSE)
