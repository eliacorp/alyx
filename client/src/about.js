'use strict';
var About = angular.module('myApp')
About.controller('aboutCtrl', function($scope, $anchorScroll, $http, $rootScope, $location, getService, $routeParams, $window, $document, anchorSmoothScroll, $route, $templateCache){


	$scope.about = $rootScope.aboutData;

});

About.directive('aboutDirective', function($rootScope, $location){
	return{
		restrict:'E',
		templateUrl: 'views/about.html',
    replace: true
	}
});
