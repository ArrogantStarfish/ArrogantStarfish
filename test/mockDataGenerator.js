var request = require('request');
var chance = require('chance').Chance();

var generateMockData = function(n) {
  var minLat = 30.431603;
  var maxLat = 48.962852;
  var minLng = -124.387555;
  var maxLng = -81.744750;
  var generateCoordinates = function() {
    var lat = Math.random() * (maxLat - minLat) + minLat;
    var lng = Math.random() * (maxLng - minLng) + minLng;
    return {latitude: lat, longitude: lng};
  };

  var topics = ['syria', 'tech', 'France', 'Canada', 'US president', 'Michigan football team', 'Starbucks'];

  var generatePost = function() {
    var post = generateCoordinates();
    post.message = chance.sentence();
    post.keyword = topics[Math.floor(Math.random() * topics.length)];
    return post;
  };

  var res = [];
  for (var i = 0; i < n; i++) {
    res.push(generatePost());
  }

  return res;
};

//super hacky/lazy way to get the url
var hostURL = process.env.CUSTOMCONNSTR_MONGOLAB_URI ? 'http://arrogantstarfish.herokuapp.com' : 'http://localhost:3000';

var postBubblesToDB = function(n) {
  var queries = generateMockData(n);
  queries.forEach(function(query) {
    console.log(query)
    request({
      body: JSON.stringify(query),
      url: hostURL + '/query',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'}, function(err, succ) {
        if (err) console.log(err);
    });
  });
};

postBubblesToDB(50);
