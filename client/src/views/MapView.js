var MapView = Backbone.View.extend({
  el: '<div id="map"></div>',

  initialize: function() {
  },

  render: function() {
    this.map = new Datamap({
      element: this.el,
      fills: {
        defaultFill: '#ABDDA4',
        bubble: 'black'
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
        radius: newsItem.get('value') || 10,
        fillOpacity: newsItem.get('opacity') || 50,
        borderColor: 'black',
        borderWidth: 1,
        fillKey: 'bubble'
      }
    });

    var bubbleArray = [
      {latitude:37.783911, longitude:-121.411502, radius:6, fillKey: 'bubble'},
      {latitude:50, longitude:-100, radius:6, fillKey: 'bubble'},
      {latitude:40, longitude:-110, radius:6, fillKey: 'bubble'}
      ];

    this.map.bubbles(bubbleArray);
  },


});
