'use strict'

var Collection = angular.module('myApp');

Collection.controller('collectionCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, $routeParams){


	$rootScope.collections = [];
	$rootScope.Collection = [];
	var collectionRan = false;

	// $rootScope.getContentType('collection', 'my.collection.date desc');


	$rootScope.chooseCollection=()=>{
		for (var i in $rootScope.collections){
			if($rootScope.collections[i].slug==$routeParams.collection){
				$rootScope.Collection = $rootScope.collections[i];
				$scope.mainLook = $rootScope.Collection.data['collection.look'].value[0];
			}
		}
	};




  	$rootScope.getContentType('collection', 'my.collection.date desc');


})

.directive('lookbookDirective', function($rootScope, $location){
	return{
		restrict:'E',
		templateUrl: 'views/collection/lookbook.html',
    replace: true
	}
});
