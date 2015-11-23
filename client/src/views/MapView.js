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

  advisoryKey: {
    "0": "white",
    "1": "#ffff38",
    "2": "#FF9900",
    "3": "#FF0000"
  },

  initialize: function() {
    this.model.on('warningsLoaded', this.renderMap, this);
  },

  renderMap: function() {
    console.log("in render");
    var context = this;
    var mwidth = $("#map").width(),
      width = 908,
      height = 410,
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
      .attr("width", mwidth)
      .attr("height", mwidth * height / width);

    svg.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height)

    var g = svg.append("g")
      .attr("id", "container");

    d3.json("../../json/countries.topo.json", function(error, us) {
      g.append("g")
        .attr("id", "countries")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.countries).features)
        .enter()
        .append("path")
        .attr("d", path)
        .each(function(d) {
          var countryModel = new CountryModel(d.id, context.model);
          var countryView = new CountryView({
            model: countryModel,
            el: this
          });
          context.model.get('countryCollection').push(countryModel);
          countryView.on('countryClicked', function(country) {
            countryClicked(d);
          }, this);
        })
        .style("fill", function(d) {
          return this.advisoryKey[this.model.get(d.id)] ? this.advisoryKey[this.model.get(d.id)] : "white";
        }.bind(context));
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

    function getXYZ(d) {
      var bounds = path.bounds(d);
      var w_scale = (bounds[1][0] - bounds[0][0]) / width;
      var h_scale = (bounds[1][1] - bounds[0][1]) / height;
      var z = .96 / Math.max(w_scale, h_scale);
      // moved center zoom point to the right to make room for a bigger tooltip
      var x = (bounds[1][0] + bounds[0][0]) / 2 - 15;
      var y = (bounds[1][1] + bounds[0][1]) / 2 + (height / z / 6);
      return [x, y, z];
    }

    function countryClicked(d) {
      g.selectAll(["#states", "#cities"]).remove();
      state = null;

      if (country) {
        g.selectAll("#" + country.id).style('display', null)
          .classed('selected', false);
      }
      if (d && country !== d) {
        var xyz = getXYZ(d);
        country = d;
        zoom(xyz);
      } else {
        var xyz = [width / 2, height / 1.5, 1];
        country = null;
        zoom(xyz);
      }
    }

    $(window).resize(function() {
      var w = $("#map").width();
      svg.attr("width", w);
      svg.attr("height", w * height / width);
    });

    this.model.get('breakingNews').trigger('getNews');
  }

});
