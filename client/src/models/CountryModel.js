var CountryModel = Backbone.Model.extend({
  url: '/issues',
  parse: function(data) {
    console.log(data);
    return {
      news: data.news,
      charities: data.charities
    };
  },
  initialize: function(name) {
    this.set('countryName', name);
  },
  getData: function() {
    var context = this;
    this.fetch({
      data: $.param({
        country: this.get('countryName')
      }),
      success: function() {
        context.trigger('dataLoaded', this);
      },
      error: function() {}
    }); //something else here
  }
});
