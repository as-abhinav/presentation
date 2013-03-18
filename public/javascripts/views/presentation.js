$(function() {

    var $newPresentationDialog = $("#newPresentationDialog"),
        $newSlideDialog = $("#newSlideDialog"),
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
            this.listenTo(this.model.slides, "add", this.addSlide);

            $("#newSlideDialog").off("submit").on("submit", this.model, this.createNewSlide);
        },

        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        removePresentation : function(event) {
          this.model.destroy();
          this.$el.remove();
          event.preventDefault();
        },
        addSlide : function(slide) {
            var slideView = new Window.SlideView({model:slide});
            this.$(".slides").append(slideView.render().el);
        },
        createNewSlide : function(event) {
            event.preventDefault();
            var model = event.data;
            model.slides.add({
                markup : $newSlideDialog.find("#markup").val()
            });
            $newSlideDialog.modal('hide');
            return false;
        }
    });

    Window.SlideView = Backbone.View.extend({
        tagName: "li",
        className: "slide",

        template :_.template($("#slideTemplate").html()),

        events : {
            "click .remove" : "removeSlide"
        },

        initialize : function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        removeSlide : function(event) {
            this.model.destroy();
            this.$el.remove();
            event.preventDefault();
        }

    });



});