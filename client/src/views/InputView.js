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
      e.preventDefault();
      var queryText = e.currentTarget[0].value;
      var message = e.currentTarget[1].value;
      var url = e.currentTarget[2].value;

      //get user
      var username = 'testUser';
      var thisView = this;

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          var query = {user:username, message: message, keyword:queryText, latitude:latitude, longitude:longitude};
          if (url) {query.url = url}
          thisView.trigger('querySubmit', query);
          $('input').val('');
        }, function() {
          alert('Failed to get location data, please allow us to have access to it and ask again WhoCares...');
        });
      } else {
        alert('Your navigator doesn\'t support location, we are sorry but you might want to update it');
      }
      
    }
  },

  render: function() {

  }
});
