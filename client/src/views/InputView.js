var InputView = Backbone.View.extend({
  el: '<form><input name="query"></input><button type="submit">Who Cares?</button></form>',

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
      console.log(queryText)
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
      }, function() {
        console.log('Fail')
      });
      // $('#query').val();
      // $('#query').val('');
    }
  },

  render: function() {

  }
});
