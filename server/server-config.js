var express = require('express');
var app = express();
var Query = require('../db/query');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

app.get('/query/:topicChars', function(req, res) {
  var topicChars = req.params.topicChars;
  // retrieve all keywords that begin with what the user is typing
  Query.find({ keyword: new RegExp('^' + topicChars, 'i') }, 'keyword').exec(function(err, queries) {
    if (err) {
      res.status(500);
      res.send(err);
    } else {

      var queriesStartingWith = [];

      // get all unique queries that begin with what the user is typing into array form
      for (var i = 0; i < queries.length; i++) {
        var keyword = queries[i].keyword;
        if (queriesStartingWith.indexOf(keyword) === -1) {
          queriesStartingWith.push(keyword);
        }
      }

      res.status(200);
      res.send(queriesStartingWith);
    }
  });
});

app.post('/query', function(req, res) {
  // create new Query instance
  var queryObj = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    keyword: req.body.keyword,
    datetime: new Date(),
    message: req.body.message
  };
  if (req.body.url) queryObj.url = req.body.url;
  var newQuery = new Query(queryObj);

  // save Query instance to database
  newQuery.save(function(err) {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      // retrieve all instances with a similar keyword from database
      var newSearch = new RegExp('^' + req.body.keyword + '$', 'i');
      Query.find({ keyword: newSearch } ).exec(function(err, queries) {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          // send queries to client
          res.status(200);
          res.send(queries);
        }
      });
    }
  });
});

module.exports = app;
