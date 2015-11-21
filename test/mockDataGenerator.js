// var request = require('request');
// var chance = require('chance').Chance();

// var generateMockData = function(n) {
//   var minLat = 30.431603;
//   var maxLat = 48.962852;
//   var minLng = -124.387555;
//   var maxLng = -81.744750;
//   var generateCoordinates = function() {
//     var lat = Math.random() * (maxLat - minLat) + minLat;
//     var lng = Math.random() * (maxLng - minLng) + minLng;
//     return {latitude: lat, longitude: lng};
//   };

//   var topics = ['syria', 'tech', 'France', 'Canada', 'US president', 'Michigan football team', 'Starbucks'];

//   var urls = ['http://www.nytimes.com/2015/11/17/world/europe/paris-terror-attack.html',
//               'http://www.nytimes.com/politics/first-draft/2015/11/16/donald-trump-repeats-call-to-inspect-mosques-for-signs-of-terrorism/',
//               'https://www.washingtonpost.com/news/football-insider/wp/2015/11/16/five-observations-from-the-redskins-win-over-the-saints/',
//               'https://www.washingtonpost.com/news/post-politics/wp/2015/11/16/obama-calls-idea-of-screening-syrian-refugees-based-on-religion-shameful-defends-white-house-strategy/',
//               'http://www.lesoir.be/1044027/article/actualite/monde/2015-11-15/attentats-paris-salah-abdeslam-aurait-ete-controle-frontiere-samedi',
//               'http://www.sfgate.com/news/article/Huge-Black-Friday-electronics-deals-6635900.php']

//   var generatePost = function() {
//     var post = generateCoordinates();
//     post.message = chance.sentence();
//     post.keyword = topics[Math.floor(Math.random() * topics.length)];
//     if (Math.random() > 0.7) {
//       post.url = urls[Math.floor(Math.random() * urls.length)];
//     }
//     return post;
//   };

//   var res = [];
//   for (var i = 0; i < n; i++) {
//     res.push(generatePost());
//   }

//   return res;
// };

// //super hacky/lazy way to get the url
// var hostURL = process.env.CUSTOMCONNSTR_MONGOLAB_URI ? 'http://arrogantstarfish.herokuapp.com' : 'http://localhost:3000';

// var postBubblesToDB = function(n) {
//   var queries = generateMockData(n);
//   queries.forEach(function(query) {
//     console.log(query)
//     request({
//       body: JSON.stringify(query),
//       url: hostURL + '/query',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       method: 'POST'}, function(err, succ) {
//         if (err) console.log(err);
//     });
//   });
// };

// postBubblesToDB(50);
