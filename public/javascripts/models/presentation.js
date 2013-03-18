
$(function(){
    Window.Presentation = Backbone.Model.extend({
        defaults : function(){
          return {
              name : "New Presentation",
              description : "An Empty Presentation. Add Some slides.",
              slides: new Window.SlideCollection

          }
        },
        initialize : function() {
            this.name = this.get("name");
            this.description = this.get("description");
            this.slides = this.get("slides");
        }
    });

    Window.PresentationCollection = Backbone.Collection.extend({
        model: Window.Presentation
    });

    Window.Slide = Backbone.Model.extend({
        defaults : function(){
            return {
                markup : "Presentation Slide"
            }
        },
        initialize : function() {
            this.markup = this.get("markup");
        }

    });

    Window.SlideCollection = Backbone.Collection.extend({
        model : Window.Slide
    });
});
