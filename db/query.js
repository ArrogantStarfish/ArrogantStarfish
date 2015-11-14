var db = require('./config');
var mongoose = require('mongoose');

var querySchema = mongoose.Schema({
  user: String,
  latitude: Number,
  longitude: Number,
  keyword: String,
  datetime: Date,
  message: String //do we need to handle links differently than rest of message?
});

var Query = mongoose.model('Query', querySchema);

module.exports = Query;
