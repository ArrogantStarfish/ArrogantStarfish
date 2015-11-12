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

  var topics = ['syria', 'tech', 'France', 'Canada', 'US president', 'Michigan football team', 'Starbucks']

  var generatePost = function() {
    var post = generateCoordinates();
    post.username = 'testUser';
    post.message = chance.sentence();
    post.keyword = topics[Math.floor(Math.random() * topics.length)];
    return post;
  }

  var res = [];
  for (var i = 0; i < n; i++) {
    res.push(generatePost());
  }

  return res;
};

module.exports = generateMockData;
