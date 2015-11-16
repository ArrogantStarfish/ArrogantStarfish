var MapView = Backbone.View.extend({
  el: '<div id="map"></div>',

  fills: {
    defaultFill: '#ABDDA4',
    older: '#b27300',
    //additions to this have to also be implemented in renderBubbles
    newerThanThreeDays: '#cc8400',
    today: '#e59400',
    thisHour: '#ffa500'
  },

  render: function() {
    this.map = new Datamap({
      element: this.el,
      fills: this.fills,
      geographyConfig: {
        popupOnHover: false,
        highlightOnHover: false
      },
      setProjection: function(element) {
        var projection = d3.geo.equirectangular()
          .center([-95, 38])
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
    //grab from the bubble
    var bubbleArray = this.collection.map(function(newsItem) {
      var itemDate = new Date(newsItem.get('datetime'));
      var deltaTime = (Date.now() - itemDate)/(1000*60*60);

      if (deltaTime < 1) {
        var fill = 'thisHour';
      } else if (deltaTime < 24) {
        var fill = 'today';
      } else if (deltaTime < 24*3) {
        var fill = 'newerThanThreeDays';
      } else {
        var fill = 'older';
      }

      return {
        latitude: newsItem.get('latitude'),
        longitude: newsItem.get('longitude'),
        message: newsItem.get('message'),
        keyword: newsItem.get('keyword'),
        url: newsItem.get('url'),
        fillKey: fill,
        radius: 5,
        fillOpacity: 1,
        borderColor: 'black',
        borderWidth: 1
      };
    });

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
      thisView.trigger('article', new NewsItemModel(data));
    });
  }

});
