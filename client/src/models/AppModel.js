var AppModel = Backbone.Model.extend({
  initialize: function() {
    this.set('searchArray', []);
    this.set('mapModel', new MapModel());
  },

  postQuery: function(query) {
    var thisModel = this;
    //populates the collection of cares
    this.get('collection').fetch({
      data: JSON.stringify(query),
      method: 'POST',
      contentType: 'application/json',
      success: function(res) {
        thisModel.trigger('renderBubbles');
      }
    });
  }
});
