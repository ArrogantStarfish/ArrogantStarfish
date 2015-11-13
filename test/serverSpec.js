var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../server/server-config');
var 

var db = require('../db/config');
var Query = require('../db/query');

describe('Who Cares test: ', function() {
  
  //remove test artifacts from database
  beforeEach(function(done) {
    request(app)
      .get('/')
      .end(function(err, res) {
        //remove things we added during testing
        // Query.remove({}).exec();
        done();
      });
  });

  describe('Query creation: ', function() {

    it('All data passed in matches what inputs were', function(done) {
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
          });
          .end(done);
        })
    });

  });

  describe('Query retrieval: ', function(){
    //before each that loads in a query, keyword A
    beforeEach(function(done) {
      query = new Query({
        
      });

      query.save(function() {
        done();
      });
    });

    it('Responds with 200 header when retrieved from database', function(done) {
      //
    });

    it('Number of queries retrieved matches number of queries created', function(done) {
      //
    });

  });


});