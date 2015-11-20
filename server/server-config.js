var express = require('express');
var request = require('request');
var app = express();
var Query = require('../db/query');
var bodyParser = require('body-parser');
var alerts = require('../db/TravelAlerts.json');
var keys = require('./keys');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));


app.get('/warnings', function(req, res) {
  Query.find().exec(function(err, warnings) {
    if (err) return console.error(err);
    res.json(warnings);
  });
});

// on get to /issues, get issues for a country
app.get('/issues', function(req, res) {
  // Need from frontend: query country, begin_date
  var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=france&fq=section_name:("Front Page" "Global Home" "International Home" "NYT Now" "Today\'s Headlines" "Topics" "World")&begin_date=20151119&api-key='+keys.ny_times;
  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      body = JSON.parse(body);
      var newsArray = [];
      var articleArray = body.response.docs;
      for (var i = 0; i < articleArray.length; i++) {
        var obj = {
          headline: articleArray[i].headline.main,
          url: articleArray[i].web_url
        };
        newsArray.push(obj);
      }
      res.send(newsArray);
    }
  });
});

app.get('/charities', function(req, res) {
  var options = {
    url: 'https://api.justgiving.com/{'+keys.just_giving+'}/v1/onesearch?q={'+req.query.country+'}',
    headers: {
      'Accept': 'application/json'
    }
  };
  request(options, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(response.body);
    }
  });
});

module.exports = app;
