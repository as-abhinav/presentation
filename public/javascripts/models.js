
$(function(){
    app.Presentation = Backbone.Model.extend({
        defaults : function(){
          return {
              name : "New Presentation",
              description : "An Empty Presentation. Add Some slides.",
              slides: new app.SlideCollection

          }
        },
        initialize : function() {
            this.name = this.get("name");
            this.description = this.get("description");
            this.slides = this.get("slides");
        }
    });

    app.PresentationCollection = Backbone.Collection.extend({
        model: app.Presentation
    });

    app.Slide = Backbone.Model.extend({
        defaults : function(){
            return {
                markup : "Presentation Slide"
            }
        },
        initialize : function() {
            this.markup = this.get("markup");
        }

    });

    app.SlideCollection = Backbone.Collection.extend({
        model : app.Slide
    });
});
