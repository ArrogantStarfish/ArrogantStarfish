var AppModel = Backbone.Model.extend({
  initialize: function() {
    this.set('NewsItemCollection', new NewsItemCollection);
  },

  postQuery: function(query){
    console.log(query);
    this.get('NewsItemCollection').fetch({
      data: query,
      method: "POST"
    }, function(res) {
      console.log(res)
    });
  }
});
