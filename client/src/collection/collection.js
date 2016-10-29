'use strict'

var Collection = angular.module('myApp');

Collection.controller('collectionCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost){



})

.directive('lookbookDirective', function($rootScope, $location){
	return{
		restrict:'E',
		templateUrl: 'views/collection/lookbook.html',
    replace: true
	}
});
