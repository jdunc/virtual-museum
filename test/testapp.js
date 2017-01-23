var request = require('supertest');
var express = require('express');
// var describe = require('mocha');
var app = require('../app.js');

describe('GET /items', function() {
  it('should respond with 200 OK', function(done) {
    request(app)
      .get('/items')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
describe('GET /items/display', function() {
  it('should respond with 200 OK', function(done) {
    request(app)
      .get('/items/display')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
describe('GET /items/1', function() {
  it('should respond with 200 OK', function(done) {
    request(app)
      .get('/items/1')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
