var CountryView = Backbone.View.extend({
  events: {
    'click': 'countryClicked'
  },
  initialize: function() {
    var context = this;
    d3.select(this.el)
      .attr("id", function(d) {
        return d.id.replace(/ /g, '_');
      })
    d3.select('svg')
      .append('g')
      .attr('class', function(d) {
        return context.model.get('countryName').replace(/ /g, '_') + '_tooltip'
      })
      .append('g')
      .style('display', 'none')
      .append('rect')
      .attr({
        width: 130,
        height: 140,
        rx: 5,
        ry: 5
      })
      .style("fill", "white")
      .attr('x', function() {
        var bbox = d3.select(context.el).node().getBBox();
        return bbox.x + bbox.width / 2
      })
      .attr('y', function() {
        var bbox = d3.select(context.el).node().getBBox();
        return bbox.y + bbox.height / 2
      })

    this.model.on('dataLoaded', this.showCountryData, this);
    this.selected = false;
  },
  countryClicked: function() {
    this.trigger('countryClicked', this);
    var context = this;
    if (!this.selected) {
      this.selected = true;
      d3.select(this.el)
        .classed('selected', true);
      d3.select('.' + context.model.get('countryName').replace(/ /g, '_') + '_tooltip').select('g')
        .style('display', 'inherit')
        .select('rect')
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
    } else {
      this.selected = false;
      d3.select('.' + context.model.get('countryName').replace(/ /g, '_') + '_tooltip').select('g')
        .style('display', 'none')
    }
  },

  showCountryData: function() {
    var context = this;
    var news = this.model.get('news');
    var charities = this.model.get('charities');

    var html = [];
    news.forEach(function(article) {
      html.push('<div>');
      html.push(article.headline);
      html.push(article.url);
      html.push('</div>');
    });

    var toolTip = d3.select('.' + context.model.get('countryName').replace(/ /g, '_') + '_tooltip').select('g');

    toolTip.append('foreignObject')
      .attr('x', 100)
      .attr('y', 100)
      .attr({
        width: 300,
        height: 300
      })
      .append("xhtml:div")
      .append('div')
      .html(html.join(''))

  }

});
