'use strict';
var Lookbook = angular.module('myApp');
Lookbook.controller('lookbookCtrl', ['$scope', '$anchorScroll', '$http', '$rootScope', '$location', '$routeParams', '$window', '$document', 'anchorSmoothScroll', function($scope, $anchorScroll, $http, $rootScope, $location, $routeParams, $window, $document, anchorSmoothScroll){



$scope.mainLook;
$scope.shiftImage=false;
$scope.animating = false;
$rootScope.readActive= false;
$scope.lookbookStatus ="read";

$scope.selectMainLook=(index)=>{
	$scope.mainLook = $rootScope.Collection.data['collection.look'].value[index];
};

$scope.selectMainLookG=(index)=>{
	$scope.mainLook = $rootScope.Lookbook.repeat[index];
};

$scope.Gender='woman';


$scope.selectGender=(gender, index)=>{
	console.log(gender, index);
	$scope.Gender=gender;
	$rootScope.Lookbook=$rootScope.Collection.data['collection.body1'].value[index];
	$scope.mainLook = $rootScope.Lookbook.repeat[0];
};






$rootScope.$on("collectionReady", function(){
	// $scope.selectMainLook(1);
	if($rootScope.Collection.data['collection.body1']){
		$scope.selectGender('woman', 0);
		$scope.keyGender();
	}else{
		$scope.keyNoGender();
	}

	// $scope.mainLook = $rootScope.Collection.data['collection.look'].value[0];

});



$scope.showDescription = function(){

	if(!$rootScope.isMobile){
		if($rootScope.readActive == false){
			$rootScope.readActive= true;
			$scope.lookbookStatus ="close";
		}else if($rootScope.readActive == true){
			$rootScope.readActive= false;
			$scope.lookbookStatus ="read";
		}
	}
		// $rootScope.readScrollDisable();

		if($scope.animating == true){
			return false;
		}else if($scope.animating == false){

				$scope.shiftImage = !$scope.shiftImage;
				$scope.animating = true;
				setTimeout(function(){
					$scope.animating = false;
				}, 1000);
		}

		if($rootScope.isMobile){
			$scope.showMain = false;
		}
}



















// $scope.mainImage;
// $scope.mainLook = 1;
// $scope.lookbookUnits = [];
// $scope.lookbook_preload_array = [];
// if(!$rootScope.isMobile){
// 	$scope.showMain = true;
// }
//
// $scope.$on("myEvent", function (event) {
// 	//only after data is pulled
// 	$scope.lookbookUnits = $rootScope.lookbook.units;
// 	$scope.mainImage = $rootScope.lookbook.units[0].src_large;
//
// 	// if(!$rootScope.isMobile){
// 	// 	for (var i in $rootScope.lookbook.units){
// 	// 			$scope.lookbook_preload_array.push($rootScope.lookbook.units[i].src_large);
// 	// 	}
// 	// 	preload.images($scope.lookbook_preload_array);
// 	// }
//
//
// });


// 	$scope.thisImage = function(look, src){
// 		$scope.mainImage = src;
// 		$scope.mainLook = look;
// 	}
//
//
// $scope.shiftImage = false;
// $scope.animating = false;
// $rootScope.readActive= false;
// $scope.lookbookStatus ="read";
//
//
// $scope.showDescription = function(){
//
// 	if(!$rootScope.isMobile){
// 		if($rootScope.readActive == false){
// 			$rootScope.readActive= true;
// 			$scope.lookbookStatus ="close";
// 		}else if($rootScope.readActive == true){
// 			$rootScope.readActive= false;
// 			$scope.lookbookStatus ="read";
// 		}
// 	}
//
//
// 		$rootScope.readScrollDisable();
//
// 		if($scope.animating == true){
// 			return false;
// 		}else if($scope.animating == false){
//
// 				$scope.shiftImage = !$scope.shiftImage;
// 				$scope.animating = true;
// 				setTimeout(function(){
// 					$scope.animating = false;
// 				}, 1000);
// 		}
//
// 		if($rootScope.isMobile){
// 			$scope.showMain = false;
// 		}
// }
//
//
// $scope.showMainImage= function(){
// 	$scope.showMain=true;
// 	$rootScope.disableScroll();
// }
//
// $scope.hideMainImage= function(){
// 	$scope.showMain=false;
// 	$rootScope.enableScroll();
// }
//
//
//
//
// $rootScope.readScrollDisable=function(){
// 	if($rootScope.readActive==true){
// 		$rootScope.disableScroll();
//
// 	}else if($rootScope.readActive==false){
// 				$rootScope.enableScroll();
// 	}
// }


var newMain;

//navigating with keys


$scope.keyNoGender=()=>{
	jQuery(document.documentElement).keyup(function (event) {

				 event.preventDefault();
				 //globals
				 var arrayLength = $rootScope.Collection.data['collection.look'].value.length-1;
				 var index = $rootScope.Collection.data['collection.look'].value.indexOf($scope.mainLook);

				// handle cursor keys
				if (event.keyCode == 39) {
				 if(index <arrayLength){
					 index = index+1;
					 $scope.mainLook = $rootScope.Collection.data['collection.look'].value[index];
				 }else{
					 $scope.mainLook = $rootScope.Collection.data['collection.look'].value[0];
				 }


				} else if (event.keyCode == 37) {
				 if(index > 0){
					 index = index-1;
					 $scope.mainLook = $rootScope.Collection.data['collection.look'].value[index];
				 }else{
					 $scope.mainLook = $rootScope.Collection.data['collection.look'].value[arrayLength];
				 }
				}
				$scope.$apply();
		});
}


$scope.keyGender=()=>{
	jQuery(document.documentElement).keyup(function (event) {

				 event.preventDefault();
				 //globals
				 var arrayLength = $rootScope.Lookbook.repeat.length-1;
				 var index = $rootScope.Lookbook.repeat.indexOf($scope.mainLook);



				// handle cursor keys
				if (event.keyCode == 39) {
				 if(index <arrayLength){
					 index = index+1;
					 $scope.mainLook = $rootScope.Lookbook.repeat[index];
				 }else{
					 $scope.mainLook = $rootScope.Lookbook.repeat[0];
				 }


				} else if (event.keyCode == 37) {
				 if(index > 0){
					 index = index-1;
					 $scope.mainLook = $rootScope.Lookbook.repeat[index];
				 }else{
					 $scope.mainLook = $rootScope.Lookbook.repeat[arrayLength];
				 }
				}

				$scope.$apply();

		});
}


//
//
//
//
//
//
//
//  $scope.journalSwipeRight = function(){
// 		var mainLookVar = parseInt($scope.mainLook);
// 		 if($scope.mainLook == 1){
// 				$scope.mainLook = $scope.lookbookUnits.length-1;
// 				$scope.fastSwipeFN($scope.mainLook);
// 				mainImgVar=$scope.mainLook;
// 				$scope.mainImage = $scope.lookbookUnits[mainImgVar].src;
// 			}else if($scope.mainLook >= 1 ){
// 					$scope.leftScroll();
// 					$scope.mainLook = mainLookVar-1;
// 					mainImgVar=mainLookVar-1
// 					$scope.mainImage = $scope.lookbookUnits[mainImgVar].src;
// 			}
// }
//
//
// $scope.fastSwipeFN=function(int){
// 	setTimeout(function(){
// 		var scrollBy = (-1)*(jQuery("#lookbook-main-img-"+int).offset().left);
// 			jQuery(".lookbook-main").animate({
// 					scrollLeft: '-='+scrollBy
// 			}, 0, 'easeOutQuad');
// 			console.log(scrollBy);
// 		}, 50);
// }
//
// var windowWidth =$window.innerWidth;
// $scope.leftScroll=function(){
// 	jQuery(".lookbook-main").animate({
// 			scrollLeft: '-='+windowWidth
// 	}, 600, 'easeOutQuad');
// }
//
// $scope.rightScroll=function(){
// 	jQuery(".lookbook-main").animate({
// 			scrollLeft: '+='+windowWidth
// 	}, 600, 'easeOutQuad');
// }
//
//
// $scope.journalSwipeLeft = function(){
// 	var mainLookVar = parseInt($scope.mainLook);
// 	var mainImgVar;
// 	if($scope.mainLook == ($scope.lookbookUnits.length-1)){
// 		$scope.fastSwipeFN(1);
// 		$scope.mainLook = 1;
// 		mainImgVar=1
// 		$scope.mainImage = $scope.lookbookUnits[mainImgVar].src;
// 	}else if($scope.mainLook <= ($scope.lookbookUnits.length-1)){
// 			$scope.rightScroll();
// 			$scope.mainLook = mainLookVar+1;
// 			mainImgVar=mainLookVar+1
// 			$scope.mainImage = $scope.lookbookUnits[mainImgVar].src;
// 			console.log($scope.mainLook);
// 	 }
// }
//





}]);
