var InputView = Backbone.View.extend({
  el: '<form><input id="query" name="query" placeholder="Subject"></input><input name="message" placeholder="Message"></input><button type="submit">Who Cares?</button></form>',

  initialize: function() {
    this.render();
    // this.on('click:button', function() {
    //   this.trigger('')
    // })
  },

  events: {
    'submit': function(e) {
      e.preventDefault();
      var queryText = e.currentTarget[0].value;
      var message = e.currentTarget[1].value;

      //get user
      var username = 'testUser';
      var thisView = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        thisView.trigger('querySubmit', {user:username, message: message, keyword:queryText, latitude:latitude, longitude:longitude});
      }, function() {
        alert('Failed to get location data...');
      });
      $('input').val('');
    }
  },

  render: function() {

  }
});
