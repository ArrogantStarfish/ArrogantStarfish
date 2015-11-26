var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../server/server-config');

describe('Who Cares Server', function() {

  describe('GET /warnings', function() {
    it('Sends travel warnings for each country for get requests to /warnings', function (done) {
      request(app)
        .get('/warnings')
        .expect(200)
        .expect(function (res) {
          var sample = res.body[0];
          expect(sample).to.be.an('object');
          expect(sample).to.include.keys('name', 'advisoryState', 'hasAdvisory', 'advisoryText');
        })
        .end(done);
    });
  });

 describe('GET /issues', function (){
  it('should return an object with a flag and an array of news and charities', function (done){
    request(app)
      .get('/issues')
      .query({'country': 'Australia'})
      .expect(function (res) {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys('news', 'charities', 'flag');
      })
      .end(done);
    });
  });

});
