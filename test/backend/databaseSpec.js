var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../server/server-config');

var db = require('../../db/config');
var alerts = require('../../db/TravelAlerts.json');
var Query = require('../../db/query');

describe('Who Cares Database', function() {

  describe('Travel Alerts', function() {
    it('Stores travel warnings in the database', function (done) {
      Query.Country.findOne({
        name: 'Australia',
      }).exec(function (err, query) {
        if (err) {
          console.error(err);
        } else {
          expect(query.advisoryText).to.equal("Exercise normal security precautions");
        }
      });
      done();
    });
    it ('Deletes old warnings from the database upon refresh', function (done) {
      db.clearAlerts();
      db.loadAlerts();
      Query.Country.find({name: 'Chile'}).exec(function (err, query) {
        if (err) {
          console.error(err);
        } else {
          console.log(typeof query);
          expect(query.length).to.equal(1);
        }
      });
      done();
    });
  });
});
