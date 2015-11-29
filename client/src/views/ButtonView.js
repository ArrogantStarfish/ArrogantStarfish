var Button = Backbone.View.extend({
  events: {
    'click': 'buttonClicked'
  },
  initialize: function() {
    //console.log(this.el);
    this.newsDisabled = false;
    this.isShrank = false;
    this.$mainBtn = this.$el;
    this.$mapBtn;
  },
  buttonClicked: function() {
    console.log('here');
    if (!this.newsDisabled) {
      this.newsDisabled = true;
      if (this.isShrank) {
        this.$el.addClass('ion-ios-eye');
        this.$el.removeClass('ion-ios-eye-outline');
      } else {
        this.$el.text('Show Breaking News')
      }
      this.trigger('hideNews');
    } else {
      this.newsDisabled = false;
      if (this.isShrank) {
        this.$el.addClass('ion-ios-eye-outline');
        this.$el.removeClass('ion-ios-eye');
      } else {
      this.$el.text('Hide Breaking News');
      }
      this.trigger('showNews');
    }
  },
  swapDomButton: function(mustShrink) {
    var newElement;
    this.$mapBtn = this.$mapBtn || $('.map-breaking-news button');
    if (!mustShrink) {
      // attach view to 'main' button
      //console.log('NOT SHRANK');
      newElement = this.$mainBtn;
      this.isShrank = false;
    } else {
      // attach view to SVG button
      //console.log('SHRANK');
      newElement = this.$mapBtn;
      this.isShrank = true;
      $('.map-bn-container').attr('x', $('svg').attr('width') - 55);
    }
    //this.$el.replaceWith(newElement)
    this.setElement(newElement);
    this.toggleButtons();
  },
  toggleButtons: function() {
    if (this.isShrank) {
      this.$mainBtn.css('display', 'none');
      this.$mapBtn.css('display', 'block');
    } else {
      this.$mainBtn.css('display', 'block');
      this.$mapBtn.css('display', 'none');
    }
  }
})
