var mongoose = require('mongoose');
var alerts = require('./TravelAlerts.json');
var Query = require('./query');

mongoURI = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/whocaresdb';

mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind('connection error: '));
db.once('open', function() {
  console.log('Mongodb connection open');
});

module.exports = db;
