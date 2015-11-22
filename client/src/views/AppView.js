var AppView = Backbone.View.extend({
  el: '<div><h1>WHO CARES?</h1></div>',

  //the initialize function delegates ALL the DOM rendering
  initialize: function() {
    //these are the views that make up the layout
    this.mapView = new MapView({
      model: this.model.get('mapModel')
    });

    //mapView must be rendered after the layout because the Datamap must attach to an already-rendered DOM element
    this.render();
    this.mapView.render();
  },

  render: function() {
    $('body').html(
      this.$el.append([
        this.mapView.el
      ])
    );
  }
});
