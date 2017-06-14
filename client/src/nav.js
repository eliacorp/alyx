'use strict'

var Nav = angular.module('myApp');

Nav.controller('navCtrl', ['$scope', '$location', '$rootScope', '$timeout', '$http', 'transformRequestAsFormPost', '$routeParams','mailchimp','$sce', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, $routeParams, mailchimp, $sce){

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


$scope.isCollection=(slug)=>{
  if($location.search().collection == slug){return true}else{return false}
}

$scope.isGender=(slug)=>{
  if($location.search().gender==slug){return true}else{return false}
}

$scope.isQuery=(key)=>{
  var obj={};
  obj = $location.search();

  if(obj.hasOwnProperty(key)){
    return true
  }else{
    return false
  }
}


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



  $scope.$on('$routeChangeSuccess', function(){
    $rootScope.Location=$location.path();
    $rootScope.shopLocation=$scope.getSecondPath();
    $rootScope.firstBase=$scope.getFirstPath();
    $rootScope.pageLoading = true;
    if( $scope.getFirstPath() =='shop'){
      $rootScope.logoLeft=false;
    }else{
      $rootScope.logoLeft=true;
    }


    if($scope.getSecondPath){
      setTimeout(function(){
        $rootScope.pageLoading = false;
        $rootScope.$apply();
      }, 800);
    }
  })


$rootScope.subscribe={
  result: false,
  error: false,
  email:''
}

$rootScope.sendSubscribe=(data, type)=>{
    mailchimp.register(data, type);
    $rootScope.$on('mailchimp-subscribe-success', function(reponse, msg){
      $rootScope.subscribe.result=true;
      setTimeout(function(){
        $rootScope.subscribe.result=false;
        $rootScope.subscribe.error=false;
        $rootScope.$apply();
      }, 2000);
    })

    $rootScope.$on('mailchimp-subscribe-error', function(reponse, msg){
      $rootScope.subscribe.result=false;
      $rootScope.subscribe.error=$sce.trustAsHtml(msg);;
      if(type=='subscribe'){
        setTimeout(function(){
          $rootScope.subscribe.result=false;
          $rootScope.subscribe.error=false;
          $rootScope.$apply();
        }, 3000);
      }
    })
}


$rootScope.rebootSubscribe=()=>{
  $rootScope.subscribe.result=false;
  $rootScope.subscribe.error=false;
}


$rootScope.showSubscribe=false;
$rootScope.showSubscribeFN=(value)=>{
  if(value){
    $rootScope.showSubscribe=true;
  }else{
    setTimeout(function(){
      $rootScope.showSubscribe=false;
      $rootScope.$apply();
    }, 1000);

  }
}




}])

.directive('subscribeDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/components/subscribe-partial.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('navDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/components/nav.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});
