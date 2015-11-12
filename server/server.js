var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname + '/../client'));

var port = process.env.PORT || 3000;

app.post('/query', function(req, res) {
  // get query info from user
});

app.get('', function(req, res) {
  // search query in database
});

app.listen(port);

module.exports = app;
