var AppModel = Backbone.Model.extend({
  initialize: function() {
    this.set('NewsItemCollection', new NewsItemCollection);
  },

  postQuery: function(e){
    console.log(e);
  }
});
