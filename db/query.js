var db = require('./config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// SCHEMAS ====================================
var countrySchema = new Schema ({
  name: String,
  advisoryState: Number,
  hasAdvisory: Number,
  advisoryText: String
});

var flagSchema = new Schema({
    img: { data: Buffer, contentType: String },
    country: String
});

// MODELS ====================================
var Country = mongoose.model('Country', countrySchema);

var Flag = mongoose.model('Flag', flagSchema);

module.exports.Country = Country;
module.exports.Flag = Flag;
