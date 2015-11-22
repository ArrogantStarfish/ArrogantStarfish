var CountryView = Backbone.View.extend({
  events: {
    'click': 'countryClicked',
    'mouseenter': 'showName',
    'mouseout': 'hideName'
  },
  initialize: function() {
    var context = this;

    d3.select(this.el)
      .attr("id", function(d) {
        context.countryID = d.id.replace(/ /g, '_')
        return context.countryID;
      });

    this.selected = false;
    this.selection = d3.select('svg').append('g').attr("class", context.countryID);


    this.makeToolTip();
    this.makeHoverTip();

    this.model.on('dataLoaded', this.showCountryData, this);
    this.model.on('selection', this.selectCountry, this);
    this.model.on('deselection', this.deselectCountry, this);
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
    var hoverTipHtml = '' +
      '<div class="hovertip-container">' +
      '  <div class ="bottom-aligner"></div>' +
      '  <div class="hovertip-content">' + this.model.get('countryName') + '</div>' +
      '</div>';

    this.hoverTip = this.selection.append('foreignObject')
      .attr('class', 'hoverTip')
      .style({
        display: 'none',
        width: 100,
        height: 100
      })
      .each(function() {
        return context.positionToMouse(this);
      })
      .html(hoverTipHtml)

  },

  positionToMouse: function(element) {
    var context = this;
    d3.select('svg').on('mousemove.' + context.countryID, function() {
      d3.select(element)
        .attr({
          x: d3.mouse(this)[0] - 102,
          y: d3.mouse(this)[1] - 102
        })
    });
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
    this.model.get('selected') ? this.model.trigger('deselection') : this.model.trigger('selection');
  },

  selectCountry: function() {
    this.hideName();
    d3.select(this.el)
      .classed('selected', true);

    this.toolTip
      .style('display', 'inherit')
      .transition()
      .duration(750)
      .attr({
        'x': 40,
        'y': 50,
        width: 300,
        height: 300
      })
    if (this.model.get('issues') === undefined) {
      console.log('getting data');
      this.model.getData();
    } else {
      this.showCountryData();
    }
  },

  deselectCountry: function() {
    this.toolTip
      .style('display', 'none');
  },

  showCountryData: function() {
    var context = this;
    var news = this.model.get('news') || [];
    var charities = this.model.get('charities') || [];
    //console.log(this)
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
      '  <div>' +
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
      html[1].push('<li><a href="' + article.url + '">' + article.headline + '</a></li>');
    });
    charities.forEach(function(charity) {
      console.log(charity)
      var charHtml = '' +
        '<li class="tooltip-charity-box">' +
        '  <div src="' + charity.Logo + '"></div>' +
        '  <a href="' + charity.Link + '">' + charity.Name + '</a>' +
        '  <div class="charity-description">' + charity.Description + '</div>' +
        '</li>';

      html[3].push(charHtml);
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
    if (!this.model.get('selected')) {
      this.hoverTip.style('display', 'inherit');
    }
  },

  hideName: function() {
    this.hoverTip.style('display', 'none');
  }

});
