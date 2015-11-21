var CountryModel = Backbone.Model.extend({
  url: '/issues',
  parse: function(data) {
    console.log(data);
  },
  initialize: function(name) {
    this.set('countryName', name);
  },
  getData: function() {
    console.log('here');
    this.fetch({
      data: $.param(this.get('countryName')),
      success: function() {},
      error: function() {}
    }); //something else here
  }
});
