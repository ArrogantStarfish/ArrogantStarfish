var ArticleView = Backbone.View.extend({ 
  el: '<div id="article"></div>',

  template: _.template('<div class="topic">(<%= keyword %>)</div> \
                        <a href="(<%= url %>)">(<%= url %>)</a>'),

  render: function() {
    return this.$el.html(this.template(this.model.attributes));
  }
