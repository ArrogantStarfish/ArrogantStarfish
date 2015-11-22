var mongoose = require('mongoose');
var alerts = require('./TravelAlerts.json');
var Query = require('./query');
var fs = require('fs');
var express = require('express');
// required for automating travel warning updates
var CronJob = require('cron').CronJob;


mongoURI = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/whocaresdb';

mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind('connection error: '));

// LOAD TRAVEL WARNINGS ====================================
function clearAlerts() {
  var Query = require('./query');
  Query.Country.find().remove().exec();
};
function loadAlerts() {
  var Query = require('./query');
  for (var key in alerts.data) {
    var entry = {
      name: alerts.data[key].eng.name,
      advisoryState: alerts.data[key]["advisory-state"],
      hasAdvisory: alerts.data[key]["has-advisory-warning"],
      advisoryText: alerts.data[key]["eng"]["advisory-text"]
    };
    var newEntry = new Query.Country(entry);
    newEntry.save();
  }
};

// LOAD FLAGS =============================================
function clearFlags() {
  var Query = require('./query');
  Query.Flag.find().remove().exec();
};
function loadFlags() {
  var Query = require('./query');

  var flagDirectory = 'db/flags-normal/';
  var data = {};
  fs.readdir(flagDirectory, function (err, flags) {
    if (err) {
      console.error(err);
    }
    flags.forEach(function (flagName) {
      fs.readFile(flagDirectory+flagName, function (err, image) {
        if (err) {
          console.error(err);
        }
        var flag = new Query.Flag;
        flag.img.data = image;
        flag.img.contentType = 'image/png';
        flag.country = flagName;
        flag.save();
      });
    });
  });
};

// UPDATE WARNINGS ONCE A WEEK ==============================
var mountie = new CronJob('21 15 * * sat', function(){
    clearAlerts();
    loadAlerts();
  }, function () {
    console.log('Cron stopped!');
  },
  true,
  timeZone = 'America/Los_Angeles'
);

db.once('open', function() {
  console.log('Mongodb connection open');
  clearFlags();
  loadFlags();
});

module.exports = db;