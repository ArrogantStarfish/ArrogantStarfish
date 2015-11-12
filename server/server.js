var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
  var pathName = ''
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.listen(3000);

module.exports = app;