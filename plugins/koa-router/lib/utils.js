/**
 * @fileOverview 工具类
 * @name utils.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const assert = require('assert');
const { isString, isObject, isSymbol, isUndefined, isArray, isFunction } = require('lodash');
const { KOA_ROUTES, KOA_CONTROLLERS, KOA_RESTS } = require('./constants');

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
function route(target, opts) {

  assert(target !== undefined && target !== null, '[koa-router] route Error: wrong target');
  assert(isObject(opts), '[koa-router] route Error: wrong opts');
  assert(isString(opts.property) || isSymbol(opts.property), '[koa-router] route Error: wrong opts.property');
  assert(isString(opts.method), '[koa-router] route Error: wrong opts.method');
  assert(isString(opts.path), '[koa-router] route Error: wrong opts.path');
  assert(isArray(opts.middlewares) ? opts.middlewares.every(isFunction) : isUndefined(opts.middlewares), '[koa-router] route Error: wrong opts.middlewares');

  if (!target[KOA_ROUTES]) {
    target[KOA_ROUTES] = [];
  }
  const routes = target[KOA_ROUTES];
  routes.push(opts);
  return target;
}

exports.route = route;

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
function controller(target, opts) {

  assert(target !== undefined && target !== null, '[koa-router] controller Error: wrong target');
  assert(isObject(opts), '[koa-router] controller Error: wrong opts');
  assert(isString(opts.path), '[koa-router] controller Error: wrong opts.path');

  let valid = true;
  if (isObject(opts.middlewares)) {
    for (const key in opts.middlewares) {
      const middlewares = opts.middlewares[key];
      if (!isArray(middlewares) || !middlewares.every(isFunction)) {
        valid = false;
        break;
      }
    }
  } else {
    valid = isUndefined(opts.middlewares);
  }
  assert(valid, '[koa-router] controller Error: wrong opts.middlewares');

  if (!target[KOA_CONTROLLERS]) {
    target[KOA_CONTROLLERS] = [];
  }
  const controllers = target[KOA_CONTROLLERS];
  controllers.push(opts);
  return target;
}

exports.controller = controller;

/**
 * 按照rest方式设置对象成员函数路由信息.
 * @param {any} target 目标对象
 * @param {CollectionOpts} opts 可选项
 * @return {any} 目标对象
 */
function rest(target, opts) {

  assert(target !== undefined && target !== null, '[koa-router] rest Error: wrong target');
  assert(isObject(opts), '[koa-router] rest Error: wrong opts');
  assert(isString(opts.path), '[koa-router] rest Error: wrong opts.path');

  let valid = true;
  if (isObject(opts.middlewares)) {
    for (const key in opts.middlewares) {
      const middlewares = opts.middlewares[key];
      if (!isArray(middlewares) || !middlewares.every(isFunction)) {
        valid = false;
        break;
      }
    }
  } else {
    valid = isUndefined(opts.middlewares);
  }
  assert(valid, '[koa-router] rest Error: wrong opts.middlewares');

  if (!target[KOA_RESTS]) {
    target[KOA_RESTS] = [];
  }
  const rests = target[KOA_RESTS];
  rests.push(opts);
  return target;
}

exports.rest = rest;
