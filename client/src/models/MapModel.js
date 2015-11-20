var MapModel = Backbone.Model.extend({
  url: '/warnings',
  parse: function(data) {
    var warnings = {}
    data.forEach(function(country) {
      console.log(country);
      warnings[country.name] = country.advisoryState;
    });
    console.log(warnings);
    return warnings;
  },
  initialize: function() {
    var context = this;
    this.fetch({
      success: function(model, response, options) {
        context.trigger('warningsLoaded', context);
      },
      error: function(model, response, options) {
        console.log("Error fetching warnings");
      }
    });
  }
});
