console.log("this is a file");
var CountryModel = Backbone.Model.extend({
  initialize: function(name) {
    this.set('url', 'country/' + name);
  },
  getData: function() {
    this.fetch(); //something else here
  }
});
