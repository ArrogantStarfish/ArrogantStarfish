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

      var thisView = this;
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function successfulLocation (position) {
          thisView.model.postQuery({
            keyword: e.currentTarget[0].value,
            message: e.currentTarget[1].value,
            url: e.currentTarget[2].value,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
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
