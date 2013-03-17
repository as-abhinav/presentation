
$(function(){
    Window.Presentation = Backbone.Model.extend({
        defaults : function(){
          return {
              name : "New Presentation",
              description : "An Empty Presentation. Add Some slides."
          }
        }
    });

    Window.PresentationCollection = Backbone.Collection.extend({
        model: Window.Presentation
    })
});
