var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../server/server-config');

var db = require('../db/config');
var alerts = require('../db/TravelAlerts.json');
var Query = require('../db/query');

describe('Who Cares Database', function() {

  // describe('Travel Alerts', function() {
  //   before (done) {
  //     mongoose.connect('mongodb://localhost/whocaresdb', done);
  //   }
  //   after (done) 
  //   it('Stores travel warnings in the database', function (done) {
  //     request(app)
  //       .get('/warnings')
  //       .expect(200)
  //       .expect(function (res) {
  //         Query.Country.findOne({
  //           name: 'Australia',
  //         }).exec(function (err, query) {
  //           if (err) console.error(err);
  //           expect(query.advisoryState).to.equal(1);
  //           expect(query.advisoryTest).to.equal("Exercise normal security precautions");
  //         })
  //       })
  //       .end(done);
  //   });
  //   it ('Deletes old warnings from the database on connection open', function (done) {

  //     Query.Country.find().exec(function (err, query) {
  //       if (err) console.error(err);
  //       expect(query.length).to.equal(229);
  //     });
  //     done();
  //   });
  //   it ('Retrieves travel warnings for the current week', function (done) {
  //     db.clearAlerts();
  //     db.loadAlerts();
  //     var alertsDate = alerts.metadata["generated"]["date"];
  //     var alertsDateArray = alertsDate.split(" ");
  //     var formatted = alertsDateArray[0].split("-");

  //     expect(formatted[0]).to.equal('2015');
  //     // expect(formatted[1]).to.equal(2015);
  //     // expect(formatted[2]).to.equal(2015);
  //     done();
  //   });
  // });

 // describe('Flags', function (){
 //  it('should store flags in the database', function (done){
 //    // request(app)
 //    //   .get('/issues')
 //    //   .query({'country': 'Australia'})
 //    //   .expect(function(res) {
 //    //     expect(res.body).to.be.an('object');
 //    //     expect(res.body).to.include.keys('news', 'charities', 'flag');
 //    //   })
 //    //   .end(done);
 //    // });
 //  });

});
