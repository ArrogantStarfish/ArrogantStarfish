var MapView = Backbone.View.extend({
  el: '<div id="map"></div>',

  initialize: function() {
  },

  render: function() {
    this.map = new Datamap({
      element: this.el,
      fills: {
        defaultFill: '#ABDDA4',
        bubbleFill: 'black'
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
        radius: newsItem.get('value') || 10,
        fillOpacity: newsItem.get('opacity') || 50,
        borderColor: 'black',
        borderWidth: 1,
        fillKey: 'bubbleFill'
      }
    });

    // var bubbleArray = [
    //   {latitude:37.783911, longitude:-121.411502, radius:6, fillKey: 'bubbleFill'},
    //   {latitude:50, longitude:-100, radius:6, fillKey: 'bubbleFill'},
    //   {latitude:40, longitude:-110, radius:6, fillKey: 'bubbleFill'}
    //   ];

    this.map.bubbles(bubbleArray, {
      popupTemplate: function(data) {
        var bubbleHover = '<div class="hoverinfo">About ' + data.keyword + ': ' + data.message;
        console.log(bubbleHover)
        if (data.url) bubbleHover = bubbleHover + ' and this fancy article: ' + data.url;
        return bubbleHover;
      }
    });
  },


});
