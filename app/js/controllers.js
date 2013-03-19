'use strict';

/*Models*/
var presentations = [],
    presentationCount = 0,
    slidesCount = 0,
    currentPresentation={
      id: "",
      title: "",
      description: "",
      slides: []
    },
    newPresentation = {
      id: "p1",
      title: "",
      description: "",
      slides: []
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
      id: "p"+ presentationCount++,
      title: $scope.presentation.title,
      description: $scope.presentation.description,
      slides: []
    });
    slidesCount = 0;
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
  $scope.slide = {content:""};
  $scope.addSlideToPresentation = function($event){
    $event.preventDefault();
    for(var index= 0,len=$scope.presentations.length;index<len;index++){
      if($scope.currentPresentation.id == $scope.presentations[index].id){
        $scope.presentations[index].slides.push({
          content:$scope.slide.content,
          id: slidesCount++
        });
        break;
      }
    }
    $("#newSlide")[0].reset();
    $("#addSlideDialog").modal('toggle');
    return false;
  };
};


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
