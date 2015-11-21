var CountryView = Backbone.View.extend({
  events: {
    'click': 'countryClicked',
    'hover': 'showName'
  },
  initialize: function() {
    var context = this;
    this.selected = false;
    this.selection = d3.select('svg').append('g').attr('class', context.countryID);

    d3.select(this.el)
      .attr("id", function(d) {
        context.countryID = d.id.replace(/ /g, '_')
        return context.countryID;
      });

    this.makeToolTip();
    this.makeHoverTip();

    this.model.on('dataLoaded', this.showCountryData, this);
  },

  makeToolTip: function() {
    var context = this;
    this.toolTip = this.selection.append('foreignObject')
      .attr('class', 'tooltip')
      .style('display', 'none')
      .each(function() {
        return context.positionToCountryCoods(this);
      });
    this.showCountryData();
  },

  makeHoverTip: function() {
    var context = this;
    this.hoverTip = this.selection.append('g')
      .attr('class', 'hovertip')
      .style('display', 'none');

    this.hoverTip
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

    this.hoverTip
      .append('text')
      .text(context.model.get('countryName'))
      .each(function() {
        return context.positionToCountryCoods(this);
      })
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
    if (!this.selected) {
      this.selected = true;
      d3.select(this.el)
        .classed('selected', true);

      this.toolTip
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
      this.toolTip
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

    this.toolTip
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
