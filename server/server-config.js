var express = require('express');
var app = express();
var path = require('path');
var Query = require('../db/query');

app.use(express.static(__dirname + '/../client'));

// todo: get geolocation information

app.post('/query', function(req, res) {
  // search query in database
  // get query info from user
  //1) keyword 2) locations within a radius
  var newQuery = new Query({
    user: req.body.user,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    keyword: req.body.keyword,
    datetime: new Date(),
    message: req.body.message
  });

  newQuery.save(function(err, newQuery) {
    if (err) {
      res.send(500, err);
    } else {
      Query.find({keyword: req.body.keyword}.exec(function(err, queries) {
        if (err) {
          res.send(500, err);
        } else {
          res.send(200, queries);
        }
      });
    }
  });
});

module.exports = app;
