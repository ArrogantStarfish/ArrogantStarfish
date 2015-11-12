var AppView = Backbone.View.extend({
  el: '<div><h1>WHO CARES?</h1></div>',

  initialize: function() {
    this.inputView = new InputView({});
    this.mapView = new MapView({});
    this.preRender();
    this.renderMap();
  },

  preRender: function() {
    $('body').append(
      this.$el.append([
        this.inputView.el,
        this.mapView.el
      ])
    );
  },

  renderMap: function() {
    // this.mapView.$el.detach();
    // this.$el.append(this.mapView.el)
    this.mapView.render();
  }
});
