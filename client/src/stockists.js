'use strict';

var Stockists = angular.module('myApp');
Stockists.controller('stockistsCtrl', function($scope, $anchorScroll, $http, $rootScope, $location, getService, $routeParams, $window, $document, anchorSmoothScroll, $route, $templateCache){


	$scope.stockists = {};
		$scope.$on("supportDataArrived", function (event) {
			$scope.stockists = $rootScope.stockistsData;
		});

});




Stockists.directive('stockistsDirective', function($rootScope, $location){
	return{
		restrict:'E',
		templateUrl: 'views/stockists.html',
    replace: true
	}
});
