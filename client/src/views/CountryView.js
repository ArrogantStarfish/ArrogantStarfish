var CountryView = Backbone.View.extend({
  events: {
    'click': 'countryClicked'
  },
  initialize: function() {
    d3.select(this.el)
      .attr("id", function(d) {
        return d.id;
      });
  },
  countryClicked: function() {
    d3.select(this.el)
      .classed('selected', true);
    this.trigger('countryClicked', this);
    //trigger request for news and charities 
  }

});
