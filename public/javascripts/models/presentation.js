var app = {};
$(function(){
    app.Presentation = Backbone.Model.extend({
        defaults : function(){
          return {
              name : "New Presentation",
              description : "An Empty Presentation. Add Some slides."
          }
        }
    });

    app.PresentationCollection = Backbone.Collection.extend({
        model: app.Presentation
    })
});
