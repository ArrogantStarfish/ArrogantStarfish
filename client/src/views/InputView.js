var InputView = Backbone.View.extend({
  el: '<form> \
         <input name="query" placeholder="Subject" required></input> \
         <input name="message" placeholder="Message" required></input> \
         <input name="url" placeholder="Any article to share?" type="url"></input> \
         <button type="submit">Who Cares?</button> \
       </form>',

  initialize: function() {
    this.render();
  },

  events: {
    'submit': function(e) {
      //prevents page from reloading
      e.preventDefault();

      //input field parameters:
      var queryText = e.currentTarget[0].value;
      var message = e.currentTarget[1].value;
      var url = e.currentTarget[2].value;

      var thisView = this;
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function successfulLocation (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          thisView.model.postQuery({
            message: message,
            keyword: queryText,
            latitude: latitude,
            longitude: longitude,
            url: url
          });
          //clear the input boxes
          $('input').val('');
        }, function locationDisabled () {
          alert('Failed to get location data, please allow us to have access to it and ask again WhoCares...');
        });
      } else {
        alert('Your navigator doesn\'t support location, we are sorry but you might want to update it');
      }
    }
  }
});
