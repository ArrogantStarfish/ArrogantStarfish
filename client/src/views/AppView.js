var AppView = Backbone.View.extend({
  el: '<div><h1>WHO CARES?</h1></div>',

  //the initialize function delegates ALL the DOM rendering
  initialize: function() {
    //these are the views that make up the layout
    this.inputView = new InputView({model: this.model});
    this.mapView = new MapView({collection: this.model.get('collection')});
    this.articleView = new ArticleView();

    //mapView must be rendered after the layout because the Datamap must attach to an already-rendered DOM element
    this.render();
    this.mapView.render();

    //these are event handlers that must delegate through appView
    this.mapView.on('article', function(data) {
      this.articleView.model = data;
      this.renderArticle();
    }, this);
    this.model.on('renderBubbles', this.mapView.renderBubbles, this.mapView);
  },

  render: function() {
    $('body').html(
      this.$el.append([
        this.inputView.el,
        this.mapView.el,
        this.articleView.el
      ])
    );
  },

  renderArticle: function() {
    this.articleView.render();
  }
});
