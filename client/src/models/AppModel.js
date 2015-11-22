var AppModel = Backbone.Model.extend({
  initialize: function() {
    this.set('mapModel', new MapModel());
  }
});
