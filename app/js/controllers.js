'use strict';

var presentations = [],
    obj = { index :  0};

/* Controllers */
function AddPresentationCtrl($scope) {
  $scope.presentations = presentations;
  $scope.submit = function(){
    console.log("submit");
    $scope.presentations.push({
      title: $scope.title,
      description: $scope.description,
      slides: []
    });
    $scope.title = "";
    $scope.description = "";
    $('#addPresentationDialog').modal('hide'); // BAD: not sure how to this without using DOM api
  };
}
function PresentationsListCtrl($scope){
  $scope.presentations = presentations;
  $scope.acvitePresentation = obj;
  $scope.remove = function(presenation, index){
    $scope.presentations.splice(index,1);
  };
  $scope.addSlide =function(index){
    $scope.acvitePresentation.index = index;
    console.log($scope.acvitePresentation.index);
  };
  $scope.removeSlide = function(presentation, index){
    console.dir(presentation);
    console.log(index);
    var idx = $scope.presentations.indexOf(presentation);
    $scope.presentations[idx].slides.splice(index, 1);
  };
};

function AddSlideCtrl($scope){
  $scope.acvitePresentation = obj;
  $scope.presentations = presentations;
  $scope.submit = function(){
    $scope.presentations[$scope.acvitePresentation.index].slides.push({"content": $scope.content});
  }
}
