var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../server/server-config');

var db = require('../db/config');
var Query = require('../db/query');

describe('Who Cares test: ', function() {
  
  //remove test artifacts from database
  beforeEach(function(done) {
    request(app)
      .get('/')
      .end(function(err, res) {
        Query.remove({user: 'doge', keyword: 'syria', latitude:30, longitude: 30, message: 'I CARE DAMNIT'}).exec();
        Query.remove({keyword: 'xgzabnor'}).exec();
        done();
      });
  });

  describe('Query creation: ', function() {

    it('Outputs match inputs', function(done) {
      request(app)
        .post('/query')
        .send({
          user: 'doge',
          latitude: 30,
          longitude: 30,
          keyword: 'syria',
          datetime: new Date(),
          message: 'I CARE DAMNIT'
        })
        .expect(200)
        .expect(function(res) {
          Query.findOne({
            user: 'doge',
            latitude: 30,
            longitude: 30,
            keyword: 'syria',
            message: 'I CARE DAMNIT'
          }).exec(function(err, query) {
            if (err) console.error(err);
            expect(query.user).to.equal('doge');
            expect(query.latitude).to.equal(30);
            expect(query.longitude).to.equal(30);
            expect(query.keyword).to.equal('syria');
            expect(query.message).to.equal('I CARE DAMNIT');
          })
        })
        .end(done);
    });

  });

  describe('Query retrieval: ', function(){
    //before each that loads in a query, keyword A
    beforeEach(function(done) {
      new Query({
        user: 'cat',
        latitude: 40,
        longitude: 40,
        keyword: 'xgzabnor',
        message: 'I SWEAR I CARE'
      }).save(function() {
        new Query({
          user: 'dog',
          latitude: 50,
          longitude: 50,
          keyword: 'xgzabnor',
          message: 'I CARE MORE'
        }).save(function() {
          new Query({
            user: 'rabbit',
            latitude: 20,
            longitude: 20,
            keyword: 'xgzabnor',
            message: 'I AM THE CARINGEST'
          }).save(function() {
            done();
          });
        });
      });



    });

    it('Responds with 200 header when retrieved from database', function(done) {
      request(app)
        .post('/query')
        .expect(200)
        .end(done);
    });

    it('Number of queries retrieved matches number of queries created', function(done) {
      request(app)
        .post('/query')
        .expect(function() {
          Query.find({keyword: 'xgzabnor'}).exec(function(err, queries) {
            expect(queries.length).to.equal(3);
          });
        })
        .end(done);
    });

  });


});
