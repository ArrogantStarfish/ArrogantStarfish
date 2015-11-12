var express = require('express');
var app = express();
var path = require('path');

var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/index.html'));
  // get user location
});

app.post('/query', function(req, res) {
  // get query info from user
});

app.get('', function(req, res) {
  // search query in database
});

app.listen(port);

module.exports = app;
