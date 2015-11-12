var express = require('express');
var app = express();
var path = require('path');

var Twitter = require('twitter');
var consumerKeys = require('./consumerKeys.js');

var port = 3000;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.get('/articles', function(req, res) {
  //twitter api call
});

app.listen(port);

var client = new Twitter({
  consumer_key: consumerKeys.consumerKey,
  consumer_secret: consumerKeys.consumerSecret,
  access_token_key: '',
  access_token_secret: ''
});

client.get('search/tweets', {q: 'kenya news', count: 100}, function(error, tweets, response) {
  var count = 0;
  for (var i = 0; i < tweets.statuses.length; i++) {
    count++;
  }
  console.log(count);
});

module.exports = app;
