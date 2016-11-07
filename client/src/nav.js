'use strict'

var Nav = angular.module('myApp');

Nav.controller('navCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, $routeParams){

$rootScope.firstBase;
$rootScope.Location;
$rootScope.logoLeft=false;

$scope.navCollections = [
  {
    "slug":"aw-16",
    "name":"aw 16"
  },
  {
    "slug":"ss-16",
    "name":"ss 16"
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
  console.log($scope.getFirstPath());
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
  console.log(first);
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
  console.log("$rootScope.Location: ",$rootScope.Location);
  $rootScope.shopLocation=$scope.getSecondPath();
  console.log($rootScope.shopLocation);

  $rootScope.firstBase=$scope.getFirstPath();
  $rootScope.pageLoading = true;
  console.log("getFirstPath: "+$scope.getFirstPath());
  if(($scope.getFirstPath() =='shop')){
    console.log("isShop");
    $rootScope.logoLeft=false;
  }else{
    console.log("not shop");
    $rootScope.logoLeft=true;
  }

  setTimeout(function(){
    $rootScope.pageLoading = false;
    $rootScope.$apply();
    console.log("routeChangeSuccess");
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
