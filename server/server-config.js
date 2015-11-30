// MODULES ====================================
// Express
var express = require('express');
var request = require('request-promise');
var Q = require('q'); 
var _ = require('lodash'); 
var app = express();
// To initalize Mongo connection
var db = require('../db/config.js');
var Query = require('../db/query');
var bodyParser = require('body-parser');
var alerts = require('../db/TravelAlerts.json');
var keys = require('./keys');
// Reddit
var Snoocore = require('snoocore'); 
var reddit = new Snoocore({
  userAgent: '/u/wecare_app WeCare@1.0.0', // unique string identifying the app
  oauth: {
    type: 'implicit',
    key: keys.top_reddit,  
    redirectUri: 'http://localhost:3000',
    scope: ['read'],
    deviceId: 'DO_NOT_TRACK_THIS_DEVICE'
  }
});
var CountryData = require('../db/CountryData');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

// Mount flag image middleware 
app.use('/flags', express.static(__dirname + '/../db/flags-normal'));

// Query DB for data on world map warnings
app.get('/warnings', function(req, res) {
  Query.Country.find().exec(function(err, warnings) {
    if (err) return console.error(err);
    res.json(warnings);
  });
});

// Return /r/worldnews subreddit Top Posts
app.get('/topreddit', function(req, res) {

  reddit('/r/worldnews/top').listing({
    limit: 10
  })
    .then(function(slice) {
      var articleArray = slice.children; 
      var newsArray = articleArray.map(function(article) {
        // Extract country name from article headline
        var splitTitle = article.data.title.split(' ');
        var location = []; 
        splitTitle.forEach(function(word) {
          var country = _.find(CountryData, function(co) {
            // Example: Russian is a demonym for Russia
            if (co.demonym === word || co.name.common === word) {
              return true; 
            }    
          }); 
          if (country && location.length < 1) { location.push(country.name.common) }; 
        }); 
        return {
          headline: article.data.title,
          url: article.data.url,
          location: location
        }
      })
      res.send(newsArray); 
    })
    .catch(function(error) {
      res.send(error); 
    });
}); 

// Return NYT Top News
app.get('/breaking', function(req, res) {

  // BUILD QUERY URLS ================================================
  var breaking_url = 'http://api.nytimes.com/svc/topstories/v1/world.json?api-key=' + keys.ny_breaking;

  // API REQUESTS ====================================================
  request(breaking_url)
    .then(function(body) {
      body = JSON.parse(body);
      var articleArray = body.results;
      var newsArray = articleArray.map(function(article) {
        return {
          headline: article.title,
          url: article.url,
          location: article.geo_facet
        };
      });
      res.send(newsArray);
    })
    .catch(function(error) {
      res.send(error);
    });
});

// Return results of NYT & JustGiving country name query
app.get('/issues', function(req, res) {
  // DATE FORMATTING =================================================
  var today = new Date(),
    day = today.getDate(),
    month = today.getMonth() + 1,
    year = today.getFullYear();
  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  todaysDate = "" + year + month + day;

  // BUILD QUERY URLS ================================================
  var ny_url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + req.query.country + '&fq=section_name:("Front Page" "Global Home" "International Home" "NYT Now" "Today\'s Headlines" "Topics" "World")&begin_date=' + todaysDate + '&api-key=' + keys.ny_times;
  var giving_url = 'https://api.justgiving.com/{' + keys.just_giving + '}/v1/onesearch?q={' + req.query.country + '}'; 
  var options = {
    url: giving_url,
    headers: {
      'Accept': 'application/json'
    }
  };
  // API REQUESTS ====================================================
  // Sends multiple requests asynchronously 
  Q.all([
    requestNY(ny_url),
    requestGiving(options),
    getFlag(req.query.country)
  ])
  .spread(function(news, charities, flag) {
    res.send({
      news: news,
      charities: charities,
      flag: flag
    })
  })
  .catch(function(error) {
    console.log(error); 
  })
  .done(); 

  // NYT API
  function requestNY(ny_url) {
    return request(ny_url)
      .then(function(body) {
        body = JSON.parse(body);
        var articles = body.response.docs;

        return articles.map(function(article) {
          return {
            headline: article.headline.main,
            url: article.web_url
          };
        });
      });
  }; 
  // JustGiving API
  function requestGiving(options) {
    return request(options)
        .then(function(body) {
          body = JSON.parse(body);
          var indexes = body.GroupedResults; 
          // Extract Charities object from GroupedResults array
          var charities; 
          indexes.forEach(function(index) {
            if (index.Title === "Charities") {
              charities = index.Results; 
              charities.forEach(function(charity) {
                charity.Logo = "https:" + charity.Logo;
              }); 
            }
          });
          return charities; 
        });  
  }; 
  // Get country's flag
  function getFlag(country) {
    var country = country.replace(/"/g, "");
    var code = _.find(CountryData, function(co) {
      if (co.name.common === country) { return true; };     
    }); 
    if (code) {
      code = code.cca2.toString().toLowerCase();
      return code + ".png";
    }    
  }
});

module.exports = app;
