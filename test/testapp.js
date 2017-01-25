const request = require('supertest');
const express = require('express');
// var describe = require('mocha');
const app = require('../app.js');

describe('GET /items', () => {
  it('should respond with 200 OK', (done) => {
    request(app)
      .get('/items')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
describe('GET /items/display', () => {
  it('should respond with 200 OK', (done) => {
    request(app)
      .get('/items/display')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
describe('GET /items/1', () => {
  it('should respond with 200 OK', (done) => {
    request(app)
      .get('/items/1')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
