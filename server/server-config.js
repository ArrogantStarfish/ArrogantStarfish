var express = require('express');
var request = require('request');
var app = express();
var Query = require('../db/query');
var bodyParser = require('body-parser');
var alerts = require('../db/TravelAlerts.json');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

// on page load, save country statuses
app.get('/queries', function (req, res) {
  for (var key in alerts.data) {
    var entry = {
      name: alerts.data[key].eng.name,
      advisoryState: alerts.data[key]["advisory-state"],
      hasAdvisory: alerts.data[key]["has-advisory-warning"],
      advisoryText: alerts.data[key]["eng"]["advisory-text"]
    };
    console.log(entry);
    var newEntry = Query(entry);
    newEntry.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Saved")
      }
    });
  }
});

// on get to /issues, get issues for a country
app.get('/issues', function (req, res) {
  request('newsapiquerystuff', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // build response with news issues
    }
  });
});

// app get charities for keyword (keyword should be the country name)
app.get('/charities', function (req, res) {
  request('https://api.justgiving.com/{8a8d1f89}/v1/onesearch?q={"Syria"}', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(response.body);
    }
  });
});

module.exports = app;
