describe("Collections", function() {
  it("should create presentation collection", function(){
    var presentations = new app.PresentationCollection;
    expect(presentations).toBeDefined();
  });

  it("should create slides collection in presentation model", function() {
     var presentation = new app.Presentation;
     expect(presentation.get("slides")).toBeDefined();
  });
});



