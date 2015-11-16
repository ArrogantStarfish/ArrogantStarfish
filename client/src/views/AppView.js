var AppView = Backbone.View.extend({
  el: '<div><h1>WHO CARES?</h1></div>',

  initialize: function() {
    this.inputView = new InputView({});
    this.mapView = new MapView({collection: this.model.get('NewsItemCollection')});
    this.preRender();
    this.renderMap();
    this.inputView.on('querySubmit', function(e){
      this.model.postQuery(e);
    }, this);
    this.model.on('renderBubbles', this.mapView.renderBubbles, this.mapView);
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
    this.mapView.render();
  }
});
