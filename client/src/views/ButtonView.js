var Button = Backbone.View.extend({
  events: {
    'click': 'buttonClicked'
  },
  initialize: function() {
    console.log(this.el);
    this.newsDisabled = false;
  },
  buttonClicked: function() {
    console.log('here');
    if (!this.newsDisabled) {
      this.newsDisabled = true;
      this.$el.text('Show Breaking News')
      this.trigger('hideNews');
    } else {
      this.newsDisabled = false;
      this.$el.text('Hide Breaking News');
      this.trigger('showNews');
    }
  }
})
