
describe('App Model', function (){
  var app = new AppModel();
  it("creates a global variable for the namespace", function() {
    should.exist(app);
  });
  it('creates a map model on initialize', function() {
    expect(app.get('mapModel')).to.be.an.instanceof(MapModel);
  });
});

// have an initialize function that calls getNews on getNews event
// have a function called getNews
describe('News Model', function () {
  var news = new NewsModel();
  it("has a url property set to /breaking", function () {
    expect(news.url).to.equal('/breaking');
  });
  it('has a function called getNews', function () {
    expect(news.getNews).to.be.a('function');
  });
  it('calls getNews when triggered on the MapView', function () {

  });
});