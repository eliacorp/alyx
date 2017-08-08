'use strict';

var Career= angular.module('myApp');

Career.controller('careerCtrl', ['$scope','$timeout', '$rootScope', '$routeParams', '$http', '$window', '$q','$location', '$sce', function ($scope, $timeout, $rootScope, $routeParams, $http, $window, $q, $location, $sce){


console.log('careerCtrl');


  $rootScope.currentPosition = "career";
  $rootScope.headerSectionName = "career";
  $rootScope.pageLoading=true;
  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.headerHide = false;
  });


  $rootScope.Career = [];

    $rootScope.getStockist=()=>{
      $http({
        method: 'GET',
        url: 'api/prismic/get/all?page=0&type=career'
      }).then(function(response) {
        $rootScope.Career= response.data.results;
        console.log($rootScope.Career);
      }, function(err) {
        console.log(err);
      });
    }

    $rootScope.getStockist();



}]);
