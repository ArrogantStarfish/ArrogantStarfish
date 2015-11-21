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
      });

    this.model.on('dataLoaded', this.showCountryData, this);
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
      .append('g')
      .append('rect')
      .attr({
        width: 130,
        height: 140,
        rx: 5,
        ry: 5,
        class: 'bg'
      })
      .style("fill", "white")
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


    if (this.model.get('issues') === undefined) {
      console.log('getting data');
      this.model.getData();
    } else {
      this.showCountryData();
    }
    //trigger request for news and charities 
  },

  showCountryData: function() {
    var context = this;
    var data = this.model.get('issues');

    var html = "";
    data.forEach(function(article) {
      html += '<div><span>' + article.headline + ': </span><span> ' + article.url + '</span></div>';
    });

    var toolTip = d3.select('.' + context.model.get('countryName').replace(' ', '_') + '_tooltip').select('g');

    toolTip.append('foreignObject')
      .attr('x', 100)
      .attr('y', 100)
      .attr({
        width: 300,
        height: 300
      })
      .append("xhtml:div")
      .append('div')
      .html(html)

  }

});
