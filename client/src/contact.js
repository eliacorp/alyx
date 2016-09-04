'use strict';

var Contact = angular.module('myApp');
Contact.controller('contactCtrl', function($scope, $anchorScroll, $http, $rootScope, $location, getService, $routeParams, $window, $document, anchorSmoothScroll, $route, $templateCache){

$scope.contact = [];
	$scope.$on("supportDataArrived", function (event) {
		$scope.contact = $rootScope.contactData.contact;
	});

});
Contact.directive('contactDirective', function($rootScope, $location){
	return{
		restrict:'E',
		templateUrl: 'views/contact.html',
    replace: true
	}
});
