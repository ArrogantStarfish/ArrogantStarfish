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

var client = new Twitter({
  consumer_key: consumerKeys.consumerKey,
  consumer_secret: consumerKeys.consumerSecret,
  access_token_key: '',
  access_token_secret: ''
});

client.get('search/tweets', {q: 'bieber'}, function(error, tweets, response) {
  var i = 0;
  for (tweet in tweets) {
    i++;
  }
  console.log(i);
});

app.get('/articles', function(req, res) {
  //twitter api call
});

app.listen(port);

module.exports = app;