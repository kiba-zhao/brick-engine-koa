/**
 * @fileOverview 工具类
 * @name utils.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';
const { KOA_ROUTES, KOA_CONTROLLERS, KOA_RESTS } = require('./constants');

function route(target, property, method, path) {

  if (!target[KOA_ROUTES]) {
    target[KOA_ROUTES] = [];
  }
  const routes = target[KOA_ROUTES];
  routes.push({ property, method, path });
}

exports.route = route;

function controller(target, path) {

  if (!target[KOA_CONTROLLERS]) {
    target[KOA_CONTROLLERS] = [];
  }
  const controllers = target[KOA_CONTROLLERS];
  controllers.push(path);
}

exports.controller = controller;

function rest(target, path) {

  if (!target[KOA_RESTS]) {
    target[KOA_RESTS] = [];
  }
  const rests = target[KOA_RESTS];
  rests.push(path);
}

exports.rest = rest;
