var AppView = Backbone.View.extend({
  el: '<div style="width: 100%">' +
      '  <h1 class="title">We&nbsp;&nbsp;&nbsp;care' +
          '<img class="heart" src="/src/img/heart.png">' +
          '<div class="title-line"></div>' +
      '  </h1>' +
      '</div>',

  //the initialize function delegates ALL the DOM rendering
  initialize: function() {
    //these are the views that make up the layout
    this.mapView = new MapView({
      model: this.model.get('mapModel')
    });

    //mapView must be rendered after the layout because the Datamap must attach to an already-rendered DOM element
    this.render();
    this.mapView.render();

    this.$scroll = new (function(){
      this.title = $('.title'),
      this.heart = $('img.heart'),
      this.line = $('.title-line'),
      this.window = $(window),
      this.titleOriginalSize = 692,
      this.titleOriginalFont = parseInt(this.title.css('font-size')),
      this.heartOriginalSize = parseInt(this.heart.css('width')),
      this.showMapLogo = true
    })();

    // here we call the function the first time to handle the scroll position on load
    this.titleHandler.call(this);
    // here we bind the scroll event to the titleHandler function
    $(window).on('scroll', _.bind(this.titleHandler, this));
  },

  titleHandler: function () {
    // here is where the magic happens :D
    this.$scroll.titleOriginalSize = 692;
    var scroll = this.$scroll.window.scrollTop();
    var updateTitleSize = this.$scroll.titleOriginalFont - scroll; 
    var newHeartWidth = (this.$scroll.heartOriginalSize * updateTitleSize) / this.$scroll.titleOriginalFont;
    var updateHeartSize = newHeartWidth / this.$scroll.heartOriginalSize;

    if (updateTitleSize >= 30) {
      this.$scroll.title.css('font-size', updateTitleSize);
      this.$scroll.heart.css('transform', 'scale3d(' + updateHeartSize + ', ' + updateHeartSize + ', 1)');
      this.$scroll.line.css('transform', 'scale3d(' + updateHeartSize + ', ' + updateHeartSize + ', 1)');
    }
    if (this.$scroll.showMapLogo && scroll >= 110 && this.$scroll.title.css('opacity') !== 0) {
      this.$scroll.showMapLogo = false;
      this.$scroll.title.animate({opacity: 0}, 150);
      $('.logo-map-small').animate({opacity: 1}, 300);
    }
    if (!this.$scroll.showMapLogo && scroll < 100 && this.$scroll.title.css('opacity') === '0') {
      this.$scroll.showMapLogo = true;
      $('.logo-map-small').animate({opacity: 0}, 200);
      this.$scroll.title.animate({opacity: 1}, 200);
    }
  },

  render: function() {
    $('body').html(
      this.$el.append([
        this.mapView.el,
      ])
    );
  }
});
