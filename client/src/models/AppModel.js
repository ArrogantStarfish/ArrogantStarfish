var AppModel = Backbone.Model.extend({
  postQuery: function(query){
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
