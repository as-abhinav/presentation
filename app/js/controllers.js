'use strict';

/*Models*/
var presentations = [];
var newPresentation = {
  title: "",
  description: ""
};


/* Controllers */

function AddNewPresentationCtrl($scope) {
  $scope.presentation = newPresentation;
  $scope.presentations = presentations;
  $scope.presentation.addNew = function($event){
    $event.preventDefault();
    $("#newPresentation")[0].reset();
    $("#addPresentationDialog").modal('toggle');
//    $("#presentationContainer").append($("#presentationTemplate").html());
    $scope.presentations.push({
      title: $scope.presentation.title,
      description: $scope.presentation.description
    });
    return false;
  };

};

function ListPresentationsCtrl($scope){
  $scope.presentations = presentations;
};


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
