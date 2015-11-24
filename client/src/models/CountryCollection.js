var CountryCollection = Backbone.Collection.extend({
  model: CountryModel,
  initialize: function(newsModel) {
    this.newsModel = newsModel;
    this.newsModel.on('newsLoaded', this.parseNews, this);
  },
  parseNews: function(breakingNews) {

  }
});
