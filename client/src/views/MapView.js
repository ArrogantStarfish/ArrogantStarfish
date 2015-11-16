var MapView = Backbone.View.extend({
  el: '<div id="map"></div>',

  fills: {
    defaultFill: '#ABDDA4',
    older: '#b27300',
    //additions to this have to also be implemented in renderBubbles()
    newerThanThreeDays: '#cc8400',
    today: '#e59400',
    thisHour: '#ffa500'
  },

  render: function() {
    //datamaps settings to get the map how we want
    this.map = new Datamap({
      element: this.el,
      fills: this.fills,
      geographyConfig: {
        popupOnHover: false,
        highlightOnHover: false
      },
      setProjection: function(element) {
        var projection = d3.geo.equirectangular()
          .center([-90, 38])
          .rotate([4.4, 0])
          .scale(1000)
          .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
        var path = d3.geo.path()
          .projection(projection);
        return {path: path, projection: projection};
      }
    });
  },

  renderBubbles: function() {
    //recreate the bubble collection to make it more datamaps friendly
    var bubbleArray = this.collection.map(function(bubble) {
      var itemDate = new Date(bubble.get('datetime'));
      var hoursSincePost = (Date.now() - itemDate)/(1000*60*60);

      if (hoursSincePost < 1) {
        var bubbleColoring = 'thisHour';
      } else if (hoursSincePost < 24) {
        var bubbleColoring = 'today';
      } else if (hoursSincePost < 24*3) {
        var bubbleColoring = 'newerThanThreeDays';
      } else {
        var bubbleColoring = 'older';
      }

      return {
        latitude: bubble.get('latitude'),
        longitude: bubble.get('longitude'),
        message: bubble.get('message'),
        keyword: bubble.get('keyword'),
        url: bubble.get('url'),
        fillKey: bubbleColoring,
        radius: 5,
        fillOpacity: 1,
        borderColor: 'black',
        borderWidth: 1
      };
    });

    //the .bubbles function is a datamaps method that creates the bubbles and the bubble hover popups
    this.map.bubbles(bubbleArray, {
      popupTemplate: function(data) {
        var bubbleHover = '<div class="hoverinfo">About ' + data.keyword + ': ' + data.message;
        if (data.url) bubbleHover = bubbleHover + ' and this fancy article: ' + data.url;
        return bubbleHover;
      }
    });

    var thisView = this;
    $('.bubbles').on('click', function (event) {
      event.preventDefault();
      var data = JSON.parse($(event.target).attr('data-info'));
      thisView.trigger('article', new BubbleModel(data));
    });
  }
});
