var AppView = Backbone.View.extend({
  el: '<div><h1>WHO CARES?</h1></div>',

  initialize: function() {
    this.inputView = new InputView({});
    this.mapView = new MapView({});
  },

  render: function() {
    return this.$el.append([
      this.inputView.render(),
      this.mapView.render()
    ]);
  }
});
