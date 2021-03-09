/**
 * @fileOverview 简单示例测试代码
 * @name simple.test.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const path = require('path');
const request = require('supertest');
const faker = require('faker');
const { Engine, inject } = require('brick-engine');
const { KOA } = require('..');

const APP_PATH = path.join(__dirname, 'fixtures', 'apps', 'simple');
const APP_CONFIG = require('./fixtures/apps/simple/config/default');
const STATIC_JSON = require('./fixtures/apps/simple/public/static.json');
const SIMPLE_JSON = require('./fixtures/apps/simple/plugins/simple/public/simple.json');

describe('simple.test.js', () => {

  let app,
    engine;

  function setup(done) {
    return koa => {
      koa.once('start', () => {
        app = koa.server;
        done();
      });
    };
  }

  beforeAll(done => {
    engine = new Engine({ chdir: APP_PATH });
    engine.init();

    const fn = setup(done);
    inject(fn, { deps: [ KOA ] });
    engine.use(fn);
  });

  afterAll(done => {
    const server = app;
    engine = undefined;
    app = undefined;
    server.close(done);
  });

  describe('koa-static', () => {

    it('success: /static.json', done => {
      request(app)
        .get('/static.json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, STATIC_JSON, done);
    });

    it('success: /public/simple.json', done => {
      request(app)
        .get('/public/simple.json')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, SIMPLE_JSON, done);
    });

    it('not found: /simple.json', done => {
      request(app)
        .get('/simple.json')
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });

  describe('koa-router: route', () => {
    it('GET /simple-inject', done => {
      request(app)
        .get('/simple-inject')
        .expect(200, APP_CONFIG.injectTestString, done);
    });
  });

  describe('koa-router: controller', () => {

    it('GET /plugins/simple', done => {
      const query = { [faker.random.word()]: faker.random.word() };
      request(app)
        .get('/plugins/simple')
        .query(query)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { query, params: { plugin: 'simple' } }, done);
    });

    it('GET /simple-ctrl', done => {
      const query = { [faker.random.word()]: faker.random.word() };
      request(app)
        .get('/simple-ctrl')
        .query(query)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { query, params: { method: 'get' }, method: 'get' }, done);
    });

    it('HEAD /simple-ctrl', done => {
      const query = { [faker.random.word()]: faker.random.word() };
      const buffer = Buffer.from(JSON.stringify({ query, params: { method: 'head' }, method: 'get' }), 'utf8');
      request(app)
        .head('/simple-ctrl')
        .query(query)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect('Content-length', buffer.byteLength.toString())
        .expect(200, done);
    });

    it('POST /simple-ctrl', done => {
      const query = { [faker.random.word()]: faker.random.word() };
      const body = { [faker.random.word()]: faker.random.word() };
      request(app)
        .post('/simple-ctrl')
        .query(query)
        .send(body)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, { query, body, method: 'post' }, done);
    });

    it('PUT /simple', done => {
      const query = { [faker.random.word()]: faker.random.word() };
      const body = { [faker.random.word()]: faker.random.word() };
      request(app)
        .put('/simple-ctrl')
        .query(query)
        .send(body)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { query, body, params: {}, method: 'put' }, done);
    });

    it('PATCH /simple-ctrl', done => {
      const query = { [faker.random.word()]: faker.random.word() };
      const body = { [faker.random.word()]: faker.random.word() };
      request(app)
        .patch('/simple-ctrl')
        .query(query)
        .send(body)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { query, body, params: {}, method: 'patch' }, done);
    });

    it('DELETE /simple-ctrl', done => {
      request(app)
        .del('/simple-ctrl')
        .expect(204, done);
    });

    it('DELETE /plugins/simple', done => {
      request(app)
        .del('/plugins/simple')
        .expect(400, done);
    });

  });

  describe('koa-router: rest', () => {

    it('GET /simple', done => {
      const query = { [faker.random.word()]: faker.random.word() };
      request(app)
        .get('/simple')
        .query(query)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { query, method: 'index' }, done);
    });

    it('HEAD /simple', done => {
      const query = { [faker.random.word()]: faker.random.word() };
      const buffer = Buffer.from(JSON.stringify({ query, method: 'index' }), 'utf8');
      request(app)
        .head('/simple')
        .query(query)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect('Content-length', buffer.byteLength.toString())
        .expect(200, done);
    });

    it('OPTIONS /simple', done => {
      request(app)
        .options('/simple')
        .expect('Allow', 'GET, POST, DELETE, OPTIONS')
        .expect(200, 'allow', done);
    });

    it('DELETE /simple', done => {
      request(app)
        .del('/simple')
        .expect(205, done);
    });

    it('POST /simple', done => {
      const query = { [faker.random.word()]: faker.random.word() };
      const body = { [faker.random.word()]: faker.random.word() };
      request(app)
        .post('/simple')
        .query(query)
        .send(body)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, { query, body, method: 'post' }, done);
    });

    it('GET /simple/:id', done => {
      const query = { [faker.random.word()]: faker.random.word() };
      const id = faker.random.uuid();
      request(app)
        .get(`/simple/${id}`)
        .query(query)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { query, params: { id, method: 'get' }, method: 'get' }, done);
    });

    it('HEAD /simple/:id', done => {
      const query = { [faker.random.word()]: faker.random.word() };
      const id = faker.random.uuid();
      const buffer = Buffer.from(JSON.stringify({ query, params: { id, method: 'head' }, method: 'get' }), 'utf8');
      request(app)
        .head(`/simple/${id}`)
        .query(query)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect('Content-length', buffer.byteLength.toString())
        .expect(200, done);
    });

    it('PUT /simple/:id', done => {
      const query = { [faker.random.word()]: faker.random.word() };
      const body = { [faker.random.word()]: faker.random.word() };
      const id = faker.random.uuid();
      request(app)
        .put(`/simple/${id}`)
        .query(query)
        .send(body)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { query, body, params: { id }, method: 'put' }, done);
    });

    it('PATCH /simple/:id', done => {
      const query = { [faker.random.word()]: faker.random.word() };
      const body = { [faker.random.word()]: faker.random.word() };
      const id = faker.random.uuid();
      request(app)
        .patch(`/simple/${id}`)
        .query(query)
        .send(body)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, { query, body, params: { id }, method: 'patch' }, done);
    });

    it('DELETE /simple/:id', done => {
      const id = faker.random.uuid();
      request(app)
        .del(`/simple/${id}`)
        .expect(204, done);
    });
  });

});
