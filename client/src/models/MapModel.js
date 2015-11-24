var MapModel = Backbone.Model.extend({
  url: '/warnings',
  parse: function(data) {
    var warnings = {}
    data.forEach(function(country) {
      var paren = country.name.indexOf('(');
      if (paren !== -1) {
        var name = country.name.substring(0, paren - 1);
      } else {
        var name = country.name;
      }
      warnings[name] = country.advisoryState;
    });

    //These are hardcoded because they're listed as Korea, North...
    warnings['North Korea'] = 3;
    warnings['South Korea'] = 0;
    warnings['Somaliland'] = 3;
    return warnings;
  },
  initialize: function() {
    this.set('selectedCountry', null);
    this.set('newsModel', new NewsModel());
    this.set('countryCollection', new CountryCollection(this.get('newsModel')));
    this.get('newsModel').on('newsLoaded', function(breakingNews) {
      this.set('breakingNews', breakingNews);
      this.separateHeadlines();
    }, this);

    var context = this;
    this.fetch({
      success: function(model, response, options) {
        context.trigger('warningsLoaded', context);
      },
      error: function(model, response, options) {
        console.log("Error fetching warnings");
      }
    });
  },

  updateCountry: function(model) {
    if (this.get('selectedCountry')) {
      this.get('selectedCountry').trigger('deselection');
    }
    this.set('selectedCountry', model);
  },
  removeSelection: function() {
    this.set('selectedCountry', null);
  },
  separateHeadlines: function() {
    this.trigger('separateHeadlines', this.get('breakingNews'));
  }
});
