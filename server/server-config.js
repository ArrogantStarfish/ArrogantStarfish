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


app.get('/issues', function(req, res) {
  // DATE FORMATTING =================================================
  var today = new Date(), day = today.getDate(), month = today.getMonth()+1, year = today.getFullYear();
  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  todaysDate = ""+year+month+day;
  // BUILD QUERY URLS ================================================
  var ny_url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+req.query.country+'&fq=section_name:("Front Page" "Global Home" "International Home" "NYT Now" "Today\'s Headlines" "Topics" "World")&begin_date='+todaysDate+'&api-key='+keys.ny_times;
  var giving_url = 'https://api.justgiving.com/{'+keys.just_giving+'}/v1/onesearch?q={'+req.query.country+'}';
  // SET HEADERS =====================================================
 
  // API REQUESTS ====================================================
  var results = {};
  request(ny_url, function(error, response, body) {
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
      results.news = newsArray;
      var options = {
        url: giving_url,
        headers: {
          'Accept': 'application/json'
        }
      };
      request(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var body = JSON.parse(response.body);
          // console.log(response.body["GroupedResults"]);
          var indexes = body["GroupedResults"];
          indexes.forEach(function (index) {
            if (index["Title"] === "Charities") {
              results.charities = index["Results"];
            }
          });
          res.send(results);
        }
      });
    }
  });
});

// return an object for the country that looks like {news: [], charities: []}

// app.get('/charities', function(req, res) {
//   var options = {
//     url: 'https://api.justgiving.com/{'+keys.just_giving+'}/v1/onesearch?q={'+req.query.country+'}',
//     headers: {
//       'Accept': 'application/json'
//     }
//   };
//   request(options, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       res.send(response.body);
//     }
//   });
// });

module.exports = app;
