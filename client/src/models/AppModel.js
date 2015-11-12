var AppModel = Backbone.Model.extend({
  initialize: function() {
    this.set('NewsItemCollection', new NewsItemCollection);
  },

  postQuery: function(query){
    console.log(query);
    this.get('NewsItemCollection').fetch({
      data: JSON.stringify(query),
      method: 'POST',
      contentType: 'application/json',
    }, function(res) {
      console.log(res)
    });
  }
});
