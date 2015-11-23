var CountryCollection = Backbone.Collection.extend({
  model: CountryModel,
  initialize: function(newsModel) {
    this.newsModel = newsModel;
    this.newsModel.on('newsLoaded', this.parseNews, this);
  },
  parseNews: function(breakingNews) {
    var context = this;
    breakingNews.forEach(function(headline) {
      var country = context.findWhere({
        countryName: headline.location[0]
      });
      if (country) {
        var news = country.get('news') || [];
        country.set('news', news.concat(headline));
      }
    });
    this.trigger('newsRendered');
  }
});
