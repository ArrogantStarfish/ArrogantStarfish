var ArticleView = Backbone.View.extend({ 
  el: '<div id="article"></div>',

  template: _.template('<div class="topic"><%= keyword %></div> \
                        <a href="<%= url %>"><%= url %></a>'),

  initialize: function(params) {
    if (params) {
      this.render();
    }
  },

  render: function() {
    if (this.model.attributes.url) {
      return this.$el.html(this.template(this.model.attributes));
    }
  }

});
