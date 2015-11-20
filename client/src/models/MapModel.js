var MapModel = Backbone.Model.extend({
  url: '/countryAdvisory',

  initialize: function() {
    // this.fetch({
    //   success: function(model, response, options) {
    //     for (var country in response.data) {
    //       this.set(country['country-eng'], country['advisory-state']);
    //     }
    //   },
    //   error : function(model, response, options) {}
    // });

    this.set("France", 0);
  }
});
