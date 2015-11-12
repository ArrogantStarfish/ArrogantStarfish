var AppModel = Backbone.Model.extend({
  initialize: function() {
    this.set('NewsItemCollection', new NewsItemCollection);
  }
});
