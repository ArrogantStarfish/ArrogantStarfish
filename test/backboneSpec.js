
describe('App Model', function(){
  var app = new AppModel();
  it("creates a global variable for the namespace", function() {
    should.exist(app);
  });
  it('creates a search array on initialize', function() {
    expect(app.get('searchArray')).to.be.an('array');
  });
  it('creates a map model on initialize', function() {
    expect(app.get('mapModel')).to.be.an.instanceof(MapModel);
  });
});