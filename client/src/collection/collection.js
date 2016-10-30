'use strict'
import Prismic from 'prismic.io'
var Collection = angular.module('myApp');

Collection.controller('collectionCtrl', function($scope, $location, $rootScope, $timeout,	$http, transformRequestAsFormPost, $routeParams){


	$rootScope.collections = [];
	$rootScope.Collection = [];
	var collectionRan = false;


	    $rootScope.getContentType = function(type, orderField){

	          Prismic.Api('https://alyx.cdn.prismic.io/api', function (err, Api) {
	              Api.form('everything')
	                  .ref(Api.master())
	                  .query(Prismic.Predicates.at("document.type", type))
	                  .orderings('['+orderField+']')
	                  .pageSize(100)
	                  .submit(function (err, response) {

	                      var Data = response;


	                      if (type =='collection'){
	                        $rootScope.collections = response.results;
													$rootScope.chooseCollection();
	                        if(collectionRan == false){
	                          console.log("collectionReady");
	                          collectionRan = true;
	                          // setTimeout(function(){
	                            $rootScope.$broadcast('collectionReady');
	                          // }, 900);

														$rootScope.$apply();

	                        }else{ return false; }

	                      }

	                      // The documents object contains a Response object with all documents of type "product".
	                      var page = response.page; // The current page number, the first one being 1
	                      var results = response.results; // An array containing the results of the current page;
	                      // you may need to retrieve more pages to get all results
	                      var prev_page = response.prev_page; // the URL of the previous page (may be null)
	                      var next_page = response.next_page; // the URL of the next page (may be null)
	                      var results_per_page = response.results_per_page; // max number of results per page
	                      var results_size = response.results_size; // the size of the current page
	                      var total_pages = response.total_pages; // the number of pages
	                      var total_results_size = response.total_results_size; // the total size of results across all pages
                        return results;
	                  });
	            });


	    };//get content type

			$rootScope.getContentType('collection', 'my.collection.date desc');


		$rootScope.chooseCollection=()=>{
			for (var i in $rootScope.collections){
				if($rootScope.collections[i].slug==$routeParams.collection){
					console.log($rootScope.collections[i].slug);
					console.log($rootScope.Collection);
					$rootScope.Collection = $rootScope.collections[i];
				}
			}
		};


})

.directive('lookbookDirective', function($rootScope, $location){
	return{
		restrict:'E',
		templateUrl: 'views/collection/lookbook.html',
    replace: true
	}
});
