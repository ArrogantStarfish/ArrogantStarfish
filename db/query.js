var db = require('./config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = new Schema ({
  name: String,
  advisoryState: Number,
  hasAdvisory: Number,
  advisoryText: String
});

var Country = mongoose.model('Country', countrySchema);

module.exports = Country;
