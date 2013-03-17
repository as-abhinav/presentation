$(function() {

    var $newPresentationDialog = $("#newPresentationDialog"),
        presentationTemplate = $("#presentationTemplate").html();

    Window.AppView = Backbone.View.extend({
        el : $("body"),

        events : {
           "submit form#newPresentationDialog" : "createNewPresentation"
        },

        initialize : function() {
            this.listenTo(presentations, "add", this.addPresentation);
        },

        addPresentation : function(presentation) {
            var presentationView = new Window.PresentationView({model:presentation});
            this.$("#presentationContainer").append(presentationView.render().el);
            return false;
        },

        createNewPresentation : function(){

            //When use 'create' submits the forms and reloads the page...?
            presentations.add({
                name: $newPresentationDialog.find("#name").val(),
                description: $newPresentationDialog.find("#description").val()
            });
            //When use 'create' does not execute the following...?
            console.log("Created " + presentations);
            $newPresentationDialog.modal('hide');
            return false;
        }
    });

    Window.PresentationView = Backbone.View.extend({
        tagName: "li",
        className: "row",

        template :_.template($("#presentationTemplate").html()),

        events : {
            "click .remove" : "removePresentation"
        },

        initialize : function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        removePresentation : function(event) {
          this.model.destroy();
          this.$el.remove();
          event.preventDefault();
        }
    })



});