var ArticleView = Backbone.View.extend({ 
  el: '<div id="article"></div>',

  template: _.template('<div class="topic"><%= keyword %></div> \
                        <div class="title"><%= title %></div> \
                        <a href="<%= url %>"><%= url %></a>'),

  // initialize: function(params) {
  //   if (params) {
  //     this.render();
  //   }
  // },

  render: function() {
    var url = this.model.get('url');
    if (url) {
      $.getJSON('http://whateverorigin.org/get?url=' + 
        encodeURIComponent(url) + '&callback=?',
        function (res) {
          var tag = /<title>(.*)<\/title>/;
          var match = res.contents.match(tag);
          var title = match ? match[1] : url;
          this.model.set('title', title);
          this.$el.html(this.template(this.model.attributes));
    }.bind(this));
      // $.ajax({
      //   url: url,
      //   crossOrigin: true,
      //   method: 'GET',
      //   contentType: 'application/json',
      //   error: function(err) {
      //     console.log(err);
      //   },
      //   success: function(res) {
      //     console.log(res);
      //   }
      // });
    }
  }

});
