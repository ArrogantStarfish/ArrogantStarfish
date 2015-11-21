var CountryView = Backbone.View.extend({
  events: {
    'click': 'countryClicked'
  },
  initialize: function() {
    var context = this;
    d3.select(this.el)
      .attr("id", function(d) {
        return d.id.replace(' ', '_');
      })
    d3.select('svg')
      .append('g')
      .attr('class', function(d) {
        return context.model.get('countryName').replace(' ', '_') + '_tooltip'
      })
  },
  countryClicked: function() {
    var context = this;
    d3.select(this.el)
      .classed('selected', true);

    this.trigger('countryClicked', this);

    var projection = d3.geo.mercator()
      .scale(150)
      .translate([938 / 2, 500 / 1.5]);

    d3.select('.' + context.model.get('countryName').replace(' ', '_') + '_tooltip')
      .append('rect')
      .attr({
        width: 130,
        height: 140,
        rx: 5,
        ry: 5,
        class: 'bg'
      })
      .attr('x', function() {
        var bbox = d3.select(context.el).node().getBBox();
        return bbox.x + bbox.width / 2
      })
      .attr('y', function() {
        var bbox = d3.select(context.el).node().getBBox();
        console.log(bbox);
        return bbox.y + bbox.height / 2
      })
      .transition()
      .duration(750)
      .attr('x', 100) // need to decide where to put it, how big it should be
      .attr('y', 100) // 
      .attr({
        width: 300,
        height: 300
      });


    this.model.getData();
    //trigger request for news and charities 
  }

});
