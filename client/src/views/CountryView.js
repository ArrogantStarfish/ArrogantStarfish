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

    var bbox = d3.select(context.el).node().getBBox();
    this.model.set('x', bbox.x + bbox.width / 2);
    this.model.set('y', bbox.y + bbox.height / 2);

    if (this.countryID === "France") {
      this.model.set('y', bbox.y + bbox.height / 2 - 70);
    }
    if (this.countryID === "United_States") {
      this.model.set('x', bbox.x + bbox.width / 2 - 250);
      this.model.set('y', bbox.y + bbox.height / 2 + 30);
    }


    this.selected = false;
    this.selection = d3.select('svg').append('g').attr("class", context.countryID);


    this.makeToolTip();
    this.makeHoverTip();

    this.model.on('dataLoaded', this.showCountryData, this);
    // this.model.on('change:news', this.showBreakingStory, this);
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
        return (context.model.get('x') * 2) / 3;
      })
      .attr('y', function() {
        return context.model.get('y');
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
        'x': 20,
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
    var flag = this.model.get('flag') || '';

    flagCSS = flag !== '' ? 'background-image: url(\'/flags/' + flag + '\')' : '';
    var html = [];
    html[0] = '' +
      '<div class="tooltip-container">' +
      '  <div class="flag" style="' + flagCSS + '"></div>' +
      '  <div class="tooltip-title">' +
      '    <p class="tooltip-title-text">' + context.model.get('countryName') + '</p>' +
      '  </div>' +
      '  <div class="tooltip-article">' +
      '    <div class="tooltip-article-header">What\'s going on right now</div>' +
      '    <hr>' +
      '    <div class="tooltip-article-content">' +
      '      <ul>';
    html[1] = [];
    html[2] = '' +
      '      </ul>' +
      '    </div>' +
      '  </div>' +
      '  <div>' +
      '    <div class="tooltip-charity-header">Make the difference</div>' +
      //'    <hr>' +
      '    <div class="tooltip-charity-content">' +
      '      <ul>';
    html[3] = [];
    html[4] = '' +
      '      </ul>' +
      '    </div>' +
      '  </div>' +
      '</div>';

    news.forEach(function(article, i) {
      // this line is needed because (i don't know why) but some articles were repeated
      if (i === 0 || article.headline !== news[i - 1].headline) {
        html[1].push('<li><a href="' + article.url + '">' + article.headline + '</a></li>');
      }
    });
    charities.forEach(function(charity, i) {
      console.log(charity)
      var logo = i === 0 ? '<div class="tooltip-charity-logo" style="background-image: url(' + charity.Logo + ')"></div>' : '';
      var charHtml = '' +
        '<li class="tooltip-charity-box">' +
        logo +
        '  <a class="tooltip-charity-title" href="' + charity.Link + '">' + charity.Name.trim() + '</a>' +
        '  <div class="charity-description">' + charity.Description + '</div>' +
        '  <div class="charity-more-link"><a href="' + charity.Link + '">Help them >></a></div>' +
        '</li>';

      html[3].push(charHtml);
    });

    this.toolTip
      .html(this.htmlBuilder(html))

  },

  htmlBuilder: function(html) {
    var a = _.reduce(html, function(string, next) {
      var toJoin = Array.isArray(next) ? next.splice(0, 4).join('') : next
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
