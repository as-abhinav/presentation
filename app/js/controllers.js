'use strict';

/*Models*/
var presentations = [],
    totalCount = 0,
    currentPresentation={
      id: "",
      title: "",
      description: ""
    },
    newPresentation = {
      id: "p1",
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
    $scope.presentations.push({
      id: "p"+ totalCount++,
      title: $scope.presentation.title,
      description: $scope.presentation.description
    });
    return false;
  };

};

function ListPresentationsCtrl($scope){
  $scope.presentations = presentations;
  $scope.currentPresentation = currentPresentation;
  $scope.setCurrentPresentation = function(presentation){
    $scope.currentPresentation.id = presentation.id;
    $scope.currentPresentation.title = presentation.title;
    $scope.currentPresentation.description = presentation.description;
  };
};

function AddSlideCtrl($scope){
  $scope.presentations = presentations;
  $scope.currentPresentation = currentPresentation;
  $scope.addSlideToPresentation = function($event){
    $event.preventDefault();
    for(var index= 0,len=$scope.presentations.length;index<len;index++){
      if($scope.currentPresentation.id == $scope.presentations[index].id){
        //Still have to add Slides to current presentation.
      }
    }
    $("#addSlideDialog").modal('toggle');
    return false;
  };
};


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
