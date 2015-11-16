var AppModel = Backbone.Model.extend({
  initialize: function() {
    this.set('NewsItemCollection', new NewsItemCollection);
  },

  postQuery: function(query){
    var thisModel = this;
    this.get('NewsItemCollection').fetch({
      data: JSON.stringify(query),
      method: 'POST',
      contentType: 'application/json',
      success: function(res) {
        console.log(thisModel);
        thisModel.trigger('renderBubbles');
      }
    });
  }
});
