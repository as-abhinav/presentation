$(function() {
    var newPresentationDialog = $("#newPresentationDialog")
    newPresentationDialog.on('submit','form', function(){
        var $form = $(this);
        app.presentationCollection.push(new app.Presentation({
            name: $form.find("#name").val(),
            description: $form.find("#description").val()
        }));
        console.log("Created " + app.presentationCollection);
        newPresentationDialog.modal('hide');
        return false;
    });
});