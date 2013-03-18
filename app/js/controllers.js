'use strict';

/*Models*/
var newPresentation = {
  title: "",
  description: ""
};


/* Controllers */

function AddNewPresentationCtrl($scope) {
  $scope.presentation = newPresentation;
  $scope.presentation.addNew = function($event){
    $event.preventDefault();
    $("#newPresentation")[0].reset();
    $("#addPresentationDialog").modal('toggle');
    return false;
  };
};

function ListPresentationsCtrl($scope){
  $scope.presentation = newPresentation;
};


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
