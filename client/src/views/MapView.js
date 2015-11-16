var MapView = Backbone.View.extend({
  el: '<div id="map"></div>',

  initialize: function() {
  },

  render: function() {
    this.map = new Datamap({
      element: this.el,
      fills: {
        defaultFill: '#ABDDA4',
        bubbleFill: 'orange'
      },
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
    var bubbleArray = this.collection.map(function(newsItem) {
      return {
        latitude: newsItem.get('latitude'),
        longitude: newsItem.get('longitude'),
        message: newsItem.get('message'),
        keyword: newsItem.get('keyword'),
        url: newsItem.get('url'),
        radius: newsItem.get('value') || 5,
        fillOpacity: newsItem.get('opacity') || 50,
        borderColor: 'black',
        borderWidth: 1,
        fillKey: 'bubbleFill'
      }
    });

    this.map.bubbles(bubbleArray, {
      popupTemplate: function(data) {
        var bubbleHover = '<div class="hoverinfo">About ' + data.keyword + ': ' + data.message;
        if (data.url) bubbleHover = bubbleHover + ' and this fancy article: ' + data.url;
        return bubbleHover;
      }
    });
  },


});
