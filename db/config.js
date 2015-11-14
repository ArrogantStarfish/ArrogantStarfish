var mongoose = require('mongoose');

var mongoURI = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/whocaresdb';

mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind('connection error: '));
db.once('open', function() {
  'use strict';
  console.log('Mongodb connection open');
});

module.exports = db;
