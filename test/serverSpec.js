var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../server/server-config');

var db = require('../db/config');
var Query = require('../db/query');

describe('Who Cares test: ', function() {

  describe('GET /warnings', function() {
    it('Sends current travel warnings upon connection open', function (done) {
      request(app)
        .get('/warnings')
        .expect(200)
        .expect(function (res) {
          Query.findOne({
            name: 'Australia',
          }).exec(function (err, query) {
            if (err) console.error(err);
            expect(query.advisoryState).to.equal(1);
            expect(query.advisoryTest).to.equal("Exercise normal security precautions");
          })
        })
        .end(done);
    });
    it ('Deletes old warnings from the database on connection open', function (done) {
      request(app)
      .get('/warnings')
      .expect(200)
      .expect(function (res) {
        Query.find().exec(function (err, query) {
          if (err) console.error(err);
          expect(query.length).to.equal(229);
        })
      })
      .end(done);
    });
  });

 describe('GET /issues', function(){
  it('should return an object with an array of news and charities', function (done){
    request(app)
      .get('/issues')
      .query({'country': 'Australia'})
      .expect(function(res) {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys('news', 'charities');
      })
      .end(done);
    });
  });

});
