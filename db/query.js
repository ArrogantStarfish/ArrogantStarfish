// MODULES ====================================
// To create mongoose schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// SCHEMAS ====================================
var countrySchema = new Schema ({
  name: String,
  advisoryState: Number,
  hasAdvisory: Number,
  advisoryText: String
});

// MODELS ====================================
var Country = mongoose.model('Country', countrySchema);

module.exports.Country = Country;
