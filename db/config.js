// MODULES ====================================
// Mongoose ORM for MongoDB
var mongoose = require('mongoose');
// Created schema
var Query = require('./query');

// Static country data
var alerts = require('./TravelAlerts.json');
// To read flag image folder
var fs = require('fs');
// To automate travel warning updates
var CronJob = require('cron').CronJob;

// CONNECT TO DB ====================================
mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/whocaresdb';

mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind('connection error: '));

// LOAD TRAVEL WARNINGS ====================================
var clearAlerts = function() {
  Query.Country.find().remove().exec();
};
var loadAlerts = function() {
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
var clearFlags = function() {
  Query.Flag.find().remove().exec();
};
var loadFlags = function() {
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

module.exports = mongoose;
