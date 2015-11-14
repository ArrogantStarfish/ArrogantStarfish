var express = require('express');
var app = express();
var Query = require('../db/query');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

app.post('/query', function(req, res) {
  // create new Query instance
  var queryObj = {user: req.body.user,
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
      // retrieve all instances with the same keyword from database
      Query.find({keyword: req.body.keyword}).exec(function(err, queries) {
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
