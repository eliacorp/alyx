'use strict'

var Nav = angular.module('myApp');

Nav.controller('navCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, $routeParams){

$rootScope.firstBase;
$rootScope.Location;
$rootScope.logoLeft=false;

$scope.navCollections = [
  {
    "slug":"pre-printemps-17",
    "name":"pre/printemps 2017"
  },
  {
    "slug":"printemps-17",
    "name":"printemps 2017"
  },
  {
    "slug":"automne-hiver-16",
    "name":"automne/hiver 2016"
  }
];





$rootScope.isNavOpen = false;

$scope.openNav = function(){
  $rootScope.isNavOpen = !$rootScope.isNavOpen;
}

$scope.closeNav = function(){
  $rootScope.isNavOpen = false;
}

$rootScope.isBasePath=()=>{
  if($scope.getFirstPath() == location){
    return true;
  }else{
    return false;
  }
}


$rootScope.isLocation=(location)=>{

  if ($location.path()==location){
    return true;
  }else{
    if(($location.path()=='/collection/'+$routeParams.collection)&&(location=='/collection')){
      return true;
    }else{
      $rootScope.collectionActive=false;
      return false;
    }

  }
}

$scope.getFirstPath=()=>{
  var first = $location.path();
  first.indexOf(1);
  first.toLowerCase();
  first = first.split("/")[1];
  return first;
}

$scope.getSecondPath=()=>{
  var first = $location.path();
  first.indexOf(1);
  first.toLowerCase();

  first = first.split("/")[2];
  return first;
}



if(($scope.getFirstPath() =='shop')){
  $rootScope.logoLeft=false;
}else{
  $rootScope.logoLeft=true;
}



$scope.$on('$routeChangeStart', function(){

})

$scope.$on('$routeChangeSuccess', function(){
  $rootScope.Location=$location.path();
  $rootScope.shopLocation=$scope.getSecondPath();
  $rootScope.firstBase=$scope.getFirstPath();
  $rootScope.pageLoading = true;
  if(($scope.getFirstPath() =='shop')){
    $rootScope.logoLeft=false;
  }else{
    $rootScope.logoLeft=true;
  }

  setTimeout(function(){
    $rootScope.pageLoading = false;
    $rootScope.$apply();
  }, 800);
})


})

.directive('navDirective', function($rootScope, $location, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/components/nav.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});
