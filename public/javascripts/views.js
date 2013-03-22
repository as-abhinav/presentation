$(function() {

    var $newPresentationDialog = $("#newPresentationDialog"),
        $newSlideDialog = $("#newSlideDialog"),
        $presentationPlayer = $("#playPresentationDialog"),
        presentationTemplate = _.template($("#presentationTemplate").html()),
        slideTemplate = _.template($("#slideTemplate").html()),
        presentationPlayerTemplate = _.template($("#playPresentationTemplate").html());

    app.View = Backbone.View.extend({
        el : $("body"),

        events : {
           "submit form#newPresentationDialog" : "createNewPresentation"
        },

        initialize : function() {
            this.listenTo(app.presentations, "add", this.addPresentation);
        },

        createNewPresentation : function(event){
            event.preventDefault();
            app.presentations.add({
                name: $newPresentationDialog.find("#name").val(),
                description: $newPresentationDialog.find("#description").val()
            });
            event.target.reset();
            $newPresentationDialog.modal('hide');
        },

        addPresentation : function(presentation) {
            var presentationView = new app.PresentationView({model:presentation});
            this.$("#presentationContainer").append(presentationView.render().el);
            return false;
        }
    });

    app.PresentationView = Backbone.View.extend({
        tagName: "li",
        className: "row",

        events : {
            "click .add-slide" : "changeListener",
            "click .remove" : "removePresentation",
            "click .play" : "playPresentation"
        },

        initialize : function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model.slides, "add", this.addSlide);
        },

        render : function() {
            this.$el.html(presentationTemplate(this.model.toJSON()));
            return this;
        },

        addSlide : function(slide) {
            var slideView = new app.SlideView({model:slide});
            this.$(".slides").append(slideView.render().el);
        },

        changeListener : function() {
            $("#newSlideDialog").off("submit").on("submit", this.model, this.createNewSlide);
        },

        createNewSlide : function(event) {
            event.preventDefault();
            var model = event.data;
            model.slides.add({
                markup : $newSlideDialog.find("#markup").val()
            });
            this.reset();
            $newSlideDialog.modal('hide');
            return false;
        },

        removePresentation : function(event) {
          this.model.destroy();
          this.$el.remove();
          event.preventDefault();
        },

        playPresentation : function() {
            $presentationPlayer.find(".modal-header h3").text(this.model.get("name"));
            this.createCarousel(this.model.get("slides"));
        },

        createCarousel : function(slides) {
            $presentationPlayer.find("#myCarousel").html(presentationPlayerTemplate({slides:slides.toJSON()}));
            $presentationPlayer.find(".item").first().addClass("active");
        }
    });

    app.SlideView = Backbone.View.extend({
        tagName: "li",
        className: "slide",

        events : {
            "click .remove" : "removeSlide"
        },

        initialize : function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render : function() {
            this.$el.html(slideTemplate(this.model.toJSON()));
            return this;
        },

        removeSlide : function(event) {
            event.preventDefault();
            this.model.destroy();
            this.$el.remove();
        }
    });
});