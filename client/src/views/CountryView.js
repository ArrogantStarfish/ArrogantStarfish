var CountryView = Backbone.View.extend({
  events: {
    'click': 'countryClicked',
    'hover': 'showName'
  },
  initialize: function() {
    var context = this;

    d3.select(this.el)
      .attr("id", function(d) {
        context.countryID = d.id.replace(/ /g, '_')
        return context.countryID;
      });


    this.tooltipSelection = d3.select('svg').append('g').attr('class', context.countryID);


    this.tooltipSelection
      .append('foreignObject')
      .attr('class', 'tooltip')
      .style('display', 'none')
      .attr({
        width: 50,
        height: 50
      })
      .each(function() {
        return context.positionToCountryCoods(this);
      });
    this.showCountryData();

    this.tooltipSelection
      .append('g')
      .attr('class', context.countryID + '_hovertip')
      .style('display', 'none')
      .append('rect')
      .attr({
        width: 50,
        height: 20,
        rx: 5,
        ry: 5
      })
      .style("fill", "white")
      .each(function() {
        return context.positionToCountryCoods(this);
      })


    this.model.on('dataLoaded', this.showCountryData, this);
    this.selected = false;
  },

  positionToCountryCoods: function(element) {
    var context = this;
    return d3.select(element)
      .attr('x', function() {
        var bbox = d3.select(context.el).node().getBBox();
        return bbox.x + bbox.width / 2
      })
      .attr('y', function() {
        var bbox = d3.select(context.el).node().getBBox();
        return bbox.y + bbox.height / 2
      });
  },

  countryClicked: function() {
    this.trigger('countryClicked', this);
    var context = this;

    //console.log(d3.select('.' + context.model.get('countryName').replace(/ /g, '_') + '.tooltip'))
    if (!this.selected) {
      this.selected = true;
      d3.select(this.el)
        .classed('selected', true);

      this.tooltipSelection.select('.tooltip')
        .style('display', 'inherit')
        .transition()
        .duration(750)
        .attr('x', 40)
        .attr('y', 50)
        .attr({
          width: 300,
          height: 300
        })
      if (this.model.get('issues') === undefined) {
        console.log('getting data');
        this.model.getData();
      } else {
        this.showCountryData();
      }
    } else {
      this.selected = false;
      d3.select('.' + context.countryID).select('.tooltip')
        .style('display', 'none')
    }
  },

  showCountryData: function() {
    var context = this;
    var news = this.model.get('news') || [];
    var charities = this.model.get('charities') || [];

    var html = [];
    html[0] = '' +
      '<div class="tooltip-container">' +
      '  <div class="flag" style="background-image: url(\'/lib/Libya.png\')"></div>' +
      '  <div class="tooltip-title">' +
      '    <p class="tooltip-title-text">' + context.model.get('countryName') + '</p>' +
      '  </div>' +
      '  <div class="tooltip-article">' +
      '    <div class="tooltip-article-header">What\'s going on rigth now</div>' +
      '    <hr>' +
      '    <div class="tooltip-article-content">' +
      '      <ul>';
    html[1] = [];
    html[2] = '' +
      '      </ul>' +
      '    </div>' +
      '  </div>' +
      '  <div class="tooltip-charity">' +
      '    <div class="tooltip-charity-header">Maybe something here</div>' +
      '    <hr>' +
      '    <div class="tooltip-charity-content">' +
      '      <ul>';
    html[3] = [];
    html[4] = '' +
      '      </ul>' +
      '    </div>' +
      '  </div>' +
      '</div>';

    news.forEach(function(article) {
      console.log(article);
      html[1].push('<li><a href="' + article.url + '">' + article.headline + '</a></li>');
    });
    charities.forEach(function() {
      html[3].push('<li><a href="' + article.url + '">' + article.headline + '</a></li>');
    });

    var toolTip = this.tooltipSelection.select('.tooltip')

    toolTip
      .html(this.htmlBuilder(html))

  },

  htmlBuilder: function(html) {
    var a = _.reduce(html, function(string, next) {
      var toJoin = Array.isArray(next) ? next /*.splice(0, 3)*/ .join('') : next
      return string + toJoin;
    }, '');
    //console.log(a);
    return a;
  },

  showName: function() {

  }

});
