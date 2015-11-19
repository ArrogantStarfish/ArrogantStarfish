var MapView = Backbone.View.extend({
  el: '<div id="map"></div>',

  fills: {
    defaultFill: '#ABDDA4',
    older: '#b27300',
    //additions to this have to also be implemented in renderBubbles()
    newerThanThreeDays: '#cc8400',
    today: '#e59400',
    thisHour: '#ffa500'
  },

  render: function() {
    console.log("trying to render");
    var m_width = $("#map").width(),
      width = 938,
      height = 500,
      country,
      state;

    var projection = d3.geo.mercator()
      .scale(150)
      .translate([width / 2, height / 1.5]);

    var path = d3.geo.path()
      .projection(projection);

    var svg = d3.select("#map").append("svg")
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("width", m_width)
      .attr("height", m_width * height / width);

    svg.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height)
      .on("click", country_clicked);

    var g = svg.append("g");

    d3.json("../../json/countries.topo.json", function(error, us) {
      g.append("g")
        .attr("id", "countries")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.countries).features)
        .enter()
        .each(function(d) {

        })
        .append("path")
        .attr("id", function(d) {
          console.log(d);
          return d.id;
        })
        .attr("d", path)
        .on("click", country_clicked);
    });

    function zoom(xyz) {
      g.transition()
        .duration(750)
        .attr("transform", "translate(" + projection.translate() + ")scale(" + xyz[2] + ")translate(-" + xyz[0] + ",-" + xyz[1] + ")")
        .selectAll(["#countries", "#states", "#cities"])
        .style("stroke-width", 1.0 / xyz[2] + "px")
        .selectAll(".city")
        .attr("d", path.pointRadius(20.0 / xyz[2]));
    }

    function get_xyz(d) {
      var bounds = path.bounds(d);
      var w_scale = (bounds[1][0] - bounds[0][0]) / width;
      var h_scale = (bounds[1][1] - bounds[0][1]) / height;
      var z = .96 / Math.max(w_scale, h_scale);
      var x = (bounds[1][0] + bounds[0][0]) / 2;
      var y = (bounds[1][1] + bounds[0][1]) / 2 + (height / z / 6);
      return [x, y, z];
    }

    function country_clicked(d) {
      g.selectAll(["#states", "#cities"]).remove();
      state = null;

      if (country) {
        g.selectAll("#" + country.id).style('display', null);
      }

      if (d && country !== d) {
        var xyz = get_xyz(d);
        country = d;
        zoom(xyz);
      } else {
        var xyz = [width / 2, height / 1.5, 1];
        country = null;
        zoom(xyz);
      }
    }

    function state_clicked(d) {
      g.selectAll("#cities").remove();

      if (d && state !== d) {
        var xyz = get_xyz(d);
        state = d;

        country_code = state.id.substring(0, 3).toLowerCase();
        state_name = state.properties.name;

        d3.json("/json/cities_" + country_code + ".topo.json", function(error, us) {
          g.append("g")
            .attr("id", "cities")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.cities).features.filter(function(d) {
              return state_name == d.properties.state;
            }))
            .enter()
            .append("path")
            .attr("id", function(d) {
              return d.properties.name;
            })
            .attr("class", "city")
            .attr("d", path.pointRadius(20 / xyz[2]));

          zoom(xyz);
        });
      } else {
        state = null;
        country_clicked(country);
      }
    }

    $(window).resize(function() {
      var w = $("#map").width();
      svg.attr("width", w);
      svg.attr("height", w * height / width);
    });
  },

  renderBubbles: function() {
    //recreate the bubble collection to make it more datamaps friendly
    var bubbleArray = this.collection.map(function(bubble) {
      var itemDate = new Date(bubble.get('datetime'));
      var hoursSincePost = (Date.now() - itemDate) / (1000 * 60 * 60);

      if (hoursSincePost < 1) {
        var bubbleColoring = 'thisHour';
      } else if (hoursSincePost < 24) {
        var bubbleColoring = 'today';
      } else if (hoursSincePost < 24 * 3) {
        var bubbleColoring = 'newerThanThreeDays';
      } else {
        var bubbleColoring = 'older';
      }

      return {
        latitude: bubble.get('latitude'),
        longitude: bubble.get('longitude'),
        message: bubble.get('message'),
        keyword: bubble.get('keyword'),
        url: bubble.get('url'),
        fillKey: bubbleColoring,
        radius: 5,
        fillOpacity: 1,
        borderColor: 'black',
        borderWidth: 1
      };
    });

    //the .bubbles function is a datamaps method that creates the bubbles and the bubble hover popups
    this.map.bubbles(bubbleArray, {
      popupTemplate: function(data) {
        var bubbleHover = '<div class="hoverinfo">About ' + data.keyword + ': ' + data.message;
        if (data.url) bubbleHover = bubbleHover + ' and this fancy article: ' + data.url;
        return bubbleHover;
      }
    });

    var thisView = this;
    $('.bubbles').on('click', function(event) {
      event.preventDefault();
      var data = JSON.parse($(event.target).attr('data-info'));
      thisView.trigger('article', new BubbleModel(data));
    });
  }
});
