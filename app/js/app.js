//'use strict';


// Declare app level module which depends on filters, and services
//angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
//  config(['$routeProvider', function($routeProvider) {
//    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
//    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
//    $routeProvider.otherwise({redirectTo: '/view1'});
//  }]);







var presentations = [],
    pptTemplate,
    slideTemplate;

function setLocalStorage(data){
  window.localStorage.setItem('ppt', JSON.stringify(data));
}
function getLocalStorage(){
  var tmpStorage = window.localStorage.getItem('ppt');
  return (tmpStorage != null) ? JSON.parse(tmpStorage) : [];
}

function createNewPresentation(ppt){
  createPresentation(ppt);
  savePresentation(ppt);
}

function savePresentation(ppt){
  if(ppt && !ppt.slides){
    ppt.slides = [];
  }
  presentations.push(ppt);
  setLocalStorage(presentations);
};

var createPresentation = function(){
  var pptTemplate = $("#presentationTemplate").html(),
      $presentationContainer = $('#presentationContainer');
  return function(ppt){
    $presentationContainer.append(_.template(pptTemplate, ppt));
  }

};

function bindCreatePptForm(){
  $("#newPresentation").on('submit', function(){
    var $form = $(this);
    createPresentation({title: $form.find('#name').val(), description: $form.find('#description').val() });
    return false;
  });
}

function bindSlideForm(){

}

function createSlide(){

}

function playPresentation(){

}

$(function(){
  //load existing presentation
  presentations = getLocalStorage();

  createPresentation = createPresentation();

  //render existing presentations on screen
  if(presentations && presentations.length){
    $.each(presentations, function(){
      createPresentation(this);
    })

  }
  //
  bindCreatePptForm();

  //
});
