var express = require('express');
var request = require('request');
var app = express();
var Query = require('../db/query');
var bodyParser = require('body-parser');
var alerts = require('../db/TravelAlerts.json');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

app.get('/warnings', function (req, res) {
  Query.find().exec(function(err, warnings) {
    if (err) return console.error(err);
    res.json(warnings);
  });
});

// on get to /issues, get issues for a country
app.get('/issues', function (req, res) {
  // Need from frontend: q, begin_date, 
  var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=france&fq=section_name:("Front Page" "Global Home" "International Home" "NYT Now" "National" "Today\'s Headlines" "Topics" "U.S." "Week in Review" "World")&begin_date=20151119&api-key=7c797d4528b7af8fdc9e050d1e22dfa0:16:73530952'; 
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // build response with news issues
      res.send(body);
    }
  });
});

// app get charities for keyword (keyword should be the country name)
app.get('/charities', function (req, res) {
  var options = {
    url: 'https://api.justgiving.com/{8a8d1f89}/v1/onesearch?q={"Syria"}',
    headers: {
      'Accept': 'application/json'
    }
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // res.send(response.body);
    }
  });
});

module.exports = app;
