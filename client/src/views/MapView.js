var MapView = Backbone.View.extend({
  el: '<div id="map"></div>',

  initialize: function() {
  },

  render: function() {
    this.map = new Datamap({
      element: this.el
    });
    // this.renderBubbles();
  },

  renderBubbles: function() {
    var bubbleArray = this.collection.map(function(newsItem) {
      return {
        latitude: newsItem.get('latitude'),
        longitude: newsItem.get('longitude'),
        radius: 10
      }
    });

    // var bubbleArray = [{latitude:37.783911, longitude:-121.411502, radius:101}];

    this.map.bubbles(bubbleArray);
  },


});
