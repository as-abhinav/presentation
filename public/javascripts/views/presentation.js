$(function() {
    var appView = Backbone.View.extend({

    });

    var $newPresentationDialog = $("#newPresentationDialog"),
        presentationTemplate = $("#presentationTemplate").html(),
        $presentationContainer = $("#presentationContainer");

    $newPresentationDialog.on('submit','form', function(){
        var $form = $(this);
        app.createPresentation({
            name: $form.find("#name").val(),
            description: $form.find("#description").val()
        });
        console.log("Created " + app.presentationCollection);
        $newPresentationDialog.modal('hide');
        return false;
    });

    app.createPresentation = function(obj) {
        var newPresentation = new app.Presentation(obj);
        app.presentationCollection.push(newPresentation);
        $presentationContainer.append(_.template(presentationTemplate, obj))

    };

    app.PresentationView = Backbone.View.extend({
        tagName: "ul",
        id: "presentationContainer",

        events : {
            "click .remove" : "removePresentation"
        },

        removePresentation : function() {
          this.model.destroy();
        }
    })



});