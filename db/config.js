var mongoose = require('mongoose');
var alerts = require('./TravelAlerts.json');
var Query = require('./query');

mongoURI = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/whocaresdb';

mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind('connection error: '));
function loadAlerts() {
  var Query = require('./query');
  for (var key in alerts.data) {
    var entry = {
      name: alerts.data[key].eng.name,
      advisoryState: alerts.data[key]["advisory-state"],
      hasAdvisory: alerts.data[key]["has-advisory-warning"],
      advisoryText: alerts.data[key]["eng"]["advisory-text"]
    };
    var newEntry = new Query(entry);
    newEntry.save();
  }
};

db.once('open', function() {
  console.log('Mongodb connection open');
  mongoose.connection.db.dropDatabase()
  loadAlerts();
});

module.exports = db;