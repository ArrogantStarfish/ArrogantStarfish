var db = require('./config');
var mongoose = require('mongoose');

var querySchema = mongoose.Schema({
  user: String,
  latitude: Number,
  longitude: Number,
  keyword: String,
  datetime: Date,
  message: String,
  url: String
});

var Query = mongoose.model('Query', querySchema);

module.exports = Query;
