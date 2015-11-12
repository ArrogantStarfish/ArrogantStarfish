var express = require('express');
var app = express();
var path = require('path');
var Query = require('../db/query');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

app.post('/', function(req, res) {
  console.log(req.body);
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
      Query.find({keyword: req.body.keyword}).exec(function(err, queries) {
        if (err) {
          res.send(500, err);
        } else {
          console.log(queries);
          res.status(200);
          res.send(queries);
        }
      });
    }
  });
});

module.exports = app;
