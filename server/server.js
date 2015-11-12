var express = require('express');
var app = express();
var path = require('path');

var Twitter = require('twitter');
var consumerKeys = require('./consumerKeys.js');

var port = 3000;

app.get('/', function(req, res) {
  var pathName = ''
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

client.get('search/tweets', {q: 'syria news', count: 5, result_type: 'popular'}, function(error, tweets, response) {
  console.log(tweets.statuses);
});

module.exports = app;
