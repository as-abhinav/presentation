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
    $scope.currentPresentation.slides = presentation.slides;
  };
  $scope.deletePresentation = function(presentation){ //Buggy
    for(var index= 0,len=$scope.presentations.length;index<len;index++){
      if(presentation.id == $scope.presentations[index].id){
        $scope.presentations = $scope.presentations.slice(0,index).concat( $scope.presentations.slice(index+1) );
        presentations = $scope.presentations;
        return;
      }
    }
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
        var slide = {
          content:$scope.slide.content,
            id: slidesCount++
        };
        $scope.presentations[index].slides.push(slide);
        break;
      }
    }
    $("#newSlide")[0].reset();
    $("#addSlideDialog").modal('toggle');
    return false;
  };
};

function PlayPresentationCtrl($scope){
  $scope.currentPresentation = currentPresentation;
  $scope.slides = $scope.currentPresentation.slides;
};


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
