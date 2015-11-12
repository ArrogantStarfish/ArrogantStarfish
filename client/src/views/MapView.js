var MapView = Backbone.View.extend({
  el: '<div id="map"></div>',

  initialize: function() {
  },

  render: function() {
    var map = new Datamap({
      element: this.el
    });
  }
});
