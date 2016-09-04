'use strict';


var Social= angular.module('myApp');



Social.controller('socialCtrl', ['$scope','$timeout', '$rootScope', '$routeParams', '$http', '$window', '$q','$location', '$sce', function ($scope, $timeout, $rootScope, $routeParams, $http, $window, $q, $location, $sce){

$rootScope.currentPosition = "social";
$rootScope.headerSectionName = "social";


  setTimeout(function(){
    $rootScope.endLoader();
  }, 600);



  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.headerHide = false;
  });


//no baility to include routeparams in .config file so doing it here

    jQuery($window).unbind("scroll.fw_fifteen_scroll");
    jQuery($window).unbind("scroll.ss_sixteen_scroll");
    jQuery($window).unbind("scroll.support_scroll");


    // ... ACCESS TOKEN .....     16826015.d8005a1.de5407c248904cb0b5cd25033ec8f38d
    // ... USER ID ..........     16826015


    // CLIENT ID	d8005a1c55b74d1ea99f22b3313c1616
    // CLIENT SECRET	385b69ef5f0c4e48b932d3e6d46d4b2a
    // WEBSITE URL	http://alyxstudio.com/
    // REDIRECT URI	http://alyxstudio.com/ http://localhost
    // SUPPORT EMAIL	cameronfdemarco@gmail.com
//..............................................................................initializing some variables

var maxID_0;
var maxID_1;
var maxID_2;
var maxID_3;
var maxID_4;
var maxID_5;
var maxID_6;
var maxID_7;
var maxID_8;
var maxID_9;
var maxID_10;
var maxID_11;
var maxID_12;
var maxID_13;
var maxID_14;
$rootScope.instaGlobal = [];

$scope.instaTotal =[];
$scope.instapics = [];
$scope.instapics1= [];
$scope.instapics2 = [];
$scope.instapics3= [];
$scope.instapics4 = [];
$scope.urlFound = [];



$scope.mainSocialImage = "";
$scope.mainSocialDescription = "";
$scope.mainLink = "";

$scope.thisNumber=0;

$scope.burgerColor="#000000";

$scope.isVideo;
$scope.mainSocialVideo="";


//changing MAIN image
var numberOne;
$scope.thisSocialImage = function(number){

  numberOne = number-1
  $scope.thisNumber=numberOne;

    if(!$scope.instaTotal[numberOne].videos){
      $scope.isVideo = false;
        $scope.mainSocialImage = $scope.instaTotal[numberOne].images.standard_resolution.url;

        console.log("first:"+$scope.instaTotal[numberOne].images.standard_resolution.url);

    }else if($scope.instaTotal[numberOne].videos){
      $scope.isVideo = true;
      var riskyVideo = $scope.instaTotal[numberOne].videos.standard_resolution.url;
      $scope.mainSocialVideo = $sce.trustAsResourceUrl(riskyVideo);
      console.log("first:"+$scope.mainSocialVideo);

    }
  $scope.mainLink =$scope.instaTotal[numberOne].link;
  $scope.mainSocialDescription = $scope.instaTotal[numberOne].caption.text;

}



//getting the right number
$scope.isItem = function(item){
	$scope.instaIndex = $scope.instaTotal.indexOf((item),0);
	$scope.instaIndex = $scope.instaIndex + 1;
	return $scope.instaIndex;
}






//..............................................................................check for a device


$scope.isSocialDevice = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
          return ($scope.isSocialDevice.Android() || $scope.isSocialDevice.BlackBerry() || $scope.isSocialDevice.iOS() || $scope.isSocialDevice.Opera() || $scope.isSocialDevice.Windows());
      }
  };



// $scope.mobileQuery=window.matchMedia( "(max-width: 767px)");
  if ($scope.isSocialDevice.any()){
    $scope.isSocialDevice = true;
  }else{
    $scope.isSocialDevice = false;
  }


//.....defining javascript media queries
$scope.mobileQuery=window.matchMedia( "(max-width: 767px)" );
$scope.tabletMinQuery=window.matchMedia( "(min-width: 768px)" );

//....if it is mobile
$scope.isSocialMobile = $scope.mobileQuery.matches;

//.....if it is tablet
$scope.isSocialTabletMin=$scope.tabletMinQuery.matches;
// $scope.isSeasonTabletMax=$scope.tabletMaxQuery.matches;

  if ($scope.isSocialTabletMin){
    $scope.isSocialTablet = true;
  } else {
    $scope.isSocialTablet = false;
  }



//......is this a mobile size and a device?
if(($scope.isSocialMobile) && ($scope.isSocialDevice)){
  $scope.isSocialMobileDevice = true;
}else{
  $scope.isSocialMobileDevice = false;
}

//......is this a tablet size and a device?
if(($scope.isSocialTablet) && ($scope.isSocialDevice)){
  $scope.isSocialTabletDevice = true;
}else{
  $scope.isSocialTabletDevice = false;
}














//..............................................................................loading new pictures
$scope.noMore = false;

$scope.globalLoadMore = function(i){
    if ($rootScope.totalDisplayed > 0){
    }else {
      //the controller
      $rootScope.totalDisplayed = i;
    }
}


$scope.loadMore = function (i) {
  $rootScope.totalDisplayed += i;
    setTimeout(function(){
      if ($rootScope.totalDisplayed > $scope.filtered.length){
         $scope.noMore = true;
          $scope.$apply();
      }
    }, 100);
};



$scope.checkLoadMore = function(){
  $rootScope.totalDisplayed=20;
  $scope.noMore = true;
  setTimeout(function(){

    if ($rootScope.totalDisplayed > $scope.filtered.length){
       $scope.noMore = true;
       $scope.$apply();
    }else if($rootScope.totalDisplayed <= $scope.filtered.length){

      setTimeout(function(){
        $scope.noMore = false;
        $scope.$apply();
      }, 1000)
    }

  }, 100);
};




//.......different loaded pictures for every device
  if ($scope.isSocialMobileDevice){

    $scope.globalLoadMore(11);

  }else if($scope.isSocialTabletDevice){

    $scope.globalLoadMore(14);

  }else{

    $scope.globalLoadMore(11);

  }










$scope.hideLoadMore = true;


$scope.filterRemovesLoadMore = function(){
  $scope.hideLoadMore = true;
}

$scope.filterAllLoadMore = function(){
  $scope.hideLoadMore = false;
}








//..............................................................................the GET request


	var endpoint = "https://api.instagram.com/v1/users/16826015/media/recent?access_token=16826015.d8005a1.744387638806403c90dfcc2a747fa970&callback=JSON_CALLBACK";
				$http({url: endpoint, method: 'JSONP', cache: true, isArray: true}).success(function(response){
						// callback(response);

            console.log(response);

							$scope.instaTotal = response.data;
              setTimeout(function(){
                $scope.thisSocialImage(1);
              }, 900);

							// maxID_0 = response.pagination.next_max_id;

              // $scope.mainSocialImage = $scope.instaTotal[0].images.standard_resolution.url;
              // $scope.mainSocialDescription = $scope.instaTotal[0].caption.text;
              // $scope.mainLink =$scope.instaTotal[0].link;


              //
							// var endpoint1 = "https://api.instagram.com/v1/users/16826015/media/recent?access_token=20694160.d8005a1.be40ac40e20643f79f018984d073de78&max_id=" + maxID_0 + "&callback=JSON_CALLBACK";
              //
					    //         $http({url: endpoint1, method: 'JSONP', cache: true, isArray: true}).success(function(response){
              //
							// 							$scope.instapics1 = response.data;
              //
							// 							$scope.instaTotal = $scope.instaTotal.concat($scope.instapics1);
              //
							// 							maxID_1 = response.pagination.next_max_id;
              //
              //
              //               //secondm is loaded so the load more can now be shown
              //               $scope.hideLoadMore = false;
              //
              //
							// 							var endpoint2 = "https://api.instagram.com/v1/users/16826015/media/recent?access_token=20694160.d8005a1.be40ac40e20643f79f018984d073de78&max_id=" + maxID_1 + "&callback=JSON_CALLBACK";
              //
							// 											$http({url: endpoint2, method: 'JSONP', cache: true, isArray: true}).success(function(response){
              //
							// 														$scope.instapics2 = response.data;
              //
							// 														$scope.instaTotal = $scope.instaTotal.concat($scope.instapics2);
              //
							// 														maxID_2 = response.pagination.next_max_id;
              //
              //
							// 											var endpoint3 = "https://api.instagram.com/v1/users/16826015/media/recent?access_token=20694160.d8005a1.be40ac40e20643f79f018984d073de78&max_id=" + maxID_2 + "&callback=JSON_CALLBACK";
              //
							// 															$http({url: endpoint3, method: 'JSONP', cache: true, isArray: true}).success(function(response){
              //
							// 																		$scope.instapics3 = response.data;
              //
							// 																		$scope.instaTotal = $scope.instaTotal.concat($scope.instapics3);
              //
							// 																		maxID_3 = response.pagination.next_max_id;
              //
              //
							// 																		var endpoint4 = "https://api.instagram.com/v1/users/16826015/media/recent?access_token=20694160.d8005a1.be40ac40e20643f79f018984d073de78&max_id=" + maxID_3 + "&callback=JSON_CALLBACK";
              //
							// 																						$http({url: endpoint4, method: 'JSONP', cache: true, isArray: true}).success(function(response){
              //
							// 																									$scope.instapics4 = response.data;
              //
							// 																									$scope.instaTotal = $scope.instaTotal.concat($scope.instapics4);
              //
							// 																									maxID_4 = response.pagination.next_max_id;
              //
              //
              //
							// 																									var endpoint5 = "https://api.instagram.com/v1/users/16826015/media/recent?access_token=20694160.d8005a1.be40ac40e20643f79f018984d073de78&max_id=" + maxID_4 + "&callback=JSON_CALLBACK";
              //
							// 																													$http({url: endpoint5, method: 'JSONP', cache: true, isArray: true}).success(function(response){
              //
							// 																																$scope.instapics5 = response.data;
              //
              //
              //
							// 																																$scope.instaTotal = $scope.instaTotal.concat($scope.instapics5);
              //
							// 																																maxID_5 = response.pagination.next_max_id;
              //
              //
              //
              //
							// 																																var endpoint6 = "https://api.instagram.com/v1/users/16826015/media/recent?access_token=20694160.d8005a1.be40ac40e20643f79f018984d073de78&max_id=" + maxID_5 + "&callback=JSON_CALLBACK";
              //
							// 																																				$http({url: endpoint6, method: 'JSONP', cache: true, isArray: true}).success(function(response){
              //
							// 																																							$scope.instapics6 = response.data;
              //
              //
							// 																																							$scope.instaTotal = $scope.instaTotal.concat($scope.instapics6);
              //
							// 																																							maxID_6 = response.pagination.next_max_id;
              //
              //
              //
							// 																																							var endpoint7 = "https://api.instagram.com/v1/users/16826015/media/recent?access_token=20694160.d8005a1.be40ac40e20643f79f018984d073de78&max_id=" + maxID_6 + "&callback=JSON_CALLBACK";
              //
							// 																																											$http({url: endpoint7, method: 'JSONP', cache: true, isArray: true}).success(function(response){
              //
							// 																																														$scope.instapics7 = response.data;
              //
              //
              //
							// 																																														$scope.instaTotal = $scope.instaTotal.concat($scope.instapics7);
              //
							// 																																														maxID_7 = response.pagination.next_max_id;
              //
              //
              //
							// 																																														var endpoint8 = "https://api.instagram.com/v1/users/16826015/media/recent?access_token=20694160.d8005a1.be40ac40e20643f79f018984d073de78&max_id=" + maxID_7 + "&callback=JSON_CALLBACK";
              //
							// 																																																		$http({url: endpoint8, method: 'JSONP', cache: true, isArray: true}).success(function(response){
              //
							// 																																																					$scope.instapics8 = response.data;
              //
              //
              //
							// 																																																					$scope.instaTotal = $scope.instaTotal.concat($scope.instapics8);
              //
							// 																																																					maxID_8 = response.pagination.next_max_id;
              //
              //
							// 																																																					var endpoint9 = "https://api.instagram.com/v1/users/16826015/media/recent?access_token=20694160.d8005a1.be40ac40e20643f79f018984d073de78&max_id=" + maxID_8 + "&callback=JSON_CALLBACK";
              //
							// 																																																									$http({url: endpoint9, method: 'JSONP', cache: true, isArray: true}).success(function(response){
              //
							// 																																																												$scope.instapics9 = response.data;
              //
              //
							// 																																																												$scope.instaTotal = $scope.instaTotal.concat($scope.instapics9);
              //
							// 																																																												maxID_9 = response.pagination.next_max_id;
              //
              //
              //
							// 																																																												var endpoint10 = "https://api.instagram.com/v1/users/16826015/media/recent?access_token=20694160.d8005a1.be40ac40e20643f79f018984d073de78&max_id=" + maxID_9 + "&callback=JSON_CALLBACK";
              //
							// 																																																																$http({url: endpoint10, method: 'JSONP', cache: true, isArray: true}).success(function(response){
              //
							// 																																																																			$scope.instapics10 = response.data;
              //
              //
							// 																																																																			$scope.instaTotal = $scope.instaTotal.concat($scope.instapics10);
              //
							// 																																																																			maxID_10 = response.pagination.next_max_id;
              //
              //
							// 																																																																			var endpoint11 = "https://api.instagram.com/v1/users/16826015/media/recent?access_token=20694160.d8005a1.be40ac40e20643f79f018984d073de78&max_id=" + maxID_10 + "&callback=JSON_CALLBACK";
              //
							// 																																																																							$http({url: endpoint11, method: 'JSONP', cache: true, isArray: true}).success(function(response){
              //
							// 																																																																										$scope.instapics11 = response.data;
              //
              //
							// 																																																																										$scope.instaTotal = $scope.instaTotal.concat($scope.instapics11);
              //
							// 																																																																										maxID_11 = response.pagination.next_max_id;
              //
							// 																																																																										var endpoint12 = "https://api.instagram.com/v1/users/16826015/media/recent?access_token=20694160.d8005a1.be40ac40e20643f79f018984d073de78&max_id=" + maxID_11 + "&callback=JSON_CALLBACK";
              //
							// 																																																																														$http({url: endpoint12, method: 'JSONP', cache: true, isArray: true}).success(function(response){
              //
							// 																																																																																	$scope.instapics12 = response.data;
              //
              //
							// 																																																																																	$scope.instaTotal = $scope.instaTotal.concat($scope.instapics12);
              //
							// 																																																																																	maxID_12 = response.pagination.next_max_id;
              //
							// 																																																																																	var endpoint13 = "https://api.instagram.com/v1/users/16826015/media/recent?access_token=20694160.d8005a1.be40ac40e20643f79f018984d073de78&max_id=" + maxID_12 + "&callback=JSON_CALLBACK";
              //
							// 																																																																																					$http({url: endpoint13, method: 'JSONP', cache: true, isArray: true}).success(function(response){
              //
							// 																																																																																								$scope.instapics13 = response.data;
              //
              //
							// 																																																																																								$scope.instaTotal = $scope.instaTotal.concat($scope.instapics13);
              //
              //
							// 																																																																																								maxID_13 = response.pagination.next_max_id;
              //
              //
              //
              //
							// 																																																																																								$scope.instaTotalLength= $scope.instaTotal.length;
              //
              //                                                                                                                                                                                 	$scope.lastNumber = $scope.instaTotalLength;
              //
              //
              //
              //
							// 																																																																																								//  $scope.$watch('[totalDisplayed, instaTotalLength]', function(newValues, oldValues) {
              //                                                                                                                                                                                  //
              //                                                                                                                                                                                  //
              //                                                                                                                                                                                 //    console.log("$scope.filtered.length: "+$scope.filtered.length);
              //                                                                                                                                                                                  //
              //                                                                                                                                                                                  //
              //                                                                                                                                                                                  //
							// 																																																																																								// 			if ($rootScope.totalDisplayed > $scope.filtered.length){
							// 																																																																																								// 				 $scope.noMore = true;
              //                                                                                                                                                                                  //
              //                                                                                                                                                                                 //          console.log("$scope.noMore: "+$scope.noMore);
              //                                                                                                                                                                                  //
              //                                                                                                                                                                                  //
							// 																																																																																								// 			}
							// 																																																																																								//  });
              //
              //
              //
              //                                                                                                                                                                                  //......getting a link out of the instagram bio
              //
              //                                                                                                                                                                                  		for ( var i = 0, len = $scope.instaTotal.length; i < len; i++){
              //
              //
              //                                                                                                                                                                                  			var cop = $scope.instaTotal[i].caption.text;
              //                                                                                                                                                                                  		//
              //                                                                                                                                                                                  		//
              //                                                                                                                                                                                  		// 	var freak = $scope.instaTotal[i].caption.text
              //                                                                                                                                                                                  		// replaceURLWithHTMLLinks(freak);
              //
              //                                                                                                                                                                                  			var re = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
              //                                                                                                                                                                                  			$scope.urlFound[i] = cop.match(re);
              //
              //                                                                                                                                                                                  		}
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //
              //
							// 																																																																																					}); //13
              //
              //
							// 																																																																														}); //12
              //
              //
							// 																																																																							}); //11
              //
              //
							// 																																																																}); //10
              //
              //
							// 																																																									}); //9
              //
              //
              //
							// 																																																		}); //8
              //
              //
							// 																																											}); //7
              //
              //
							// 																																				}); //6
              //
							// 																													}); //5
              //
							// 																						}); //4
              //
							// 															});//3
							// 								}); //2
              //
					    //         }); //1


				}); //0









	$scope.socialMobileLocation = function(url){
		$location.path(url).search();
	}

	$scope.socialMobileOutsideViewOnInstagram = function(){
		$window.open($scope.instaTotal[$scope.realNumber].link, '_blank');
	}

	$scope.socialMobileOutsideReadFullStory = function(){
		$window.open($scope.urlFound[$scope.realNumber][0], '_blank');


	}




//............................................................. filters ..........................................................................................
// $scope.query ={};
// $scope.query.tags= "alyxgirls";




$scope.clearFilter = function() {
		$scope.query = {};
};

// $scope.span=0;

// $scope.mobileFilterChange= function(){
//
//      if ($scope.query.tags === "All"){
//       //  alert('clear');
//       $scope.hideLoadMore = false;
//         $scope.query={};
//
//      }else{
//       $scope.hideLoadMore = true;
//
//      }
//
// }



//.............................................................instgram detail



$scope.firstNumber = 1;
$rootScope.number = $routeParams.number;
// $scope.nextNumber = parseInt($routeParams.number)+1;
// $scope.prevNumber = parseInt($routeParams.number)-1;
// $scope.realNumber = parseInt($routeParams.number) -1;

$scope.$root = {
		initializing: {
				status: 'Complete!'
		}
}

//Share Slider function
 $rootScope.instaShareSlide = function(){
       $scope.instaShareHide = !$scope.instaShareHide;
      event.preventDefault();
 }



 //...............................................................................mobile gestures
 if ($scope.isSocialDevice){

  //preventing scroll down if select box open
  // $scope.preventScroll = function(event){
        // alert('prevented');
    // event.preventDefault();

    //       alert('preventeddddd');
    // jQuery('.mobile-filter-select').on('touchmove', function (event) {
    //   event.preventDefault();
    //   alert('preventeddddd');
    // }, false);
  // }


 // $scope.socialSwipeRight = function(){
 //
 //  if ($scope.prevNumber > 0) {
 // 	 // go left
 // 		return $location.path('social/'+$scope.prevNumber).search();
 //
 //  } else if ($scope.prevNumber < 1) {
 // 	 // go right
 // 		 return $location.path('social/'+$scope.instaTotal.length).search();
 //  }
 //
 // }
 //
 // $scope.SocialSwipeLeft = function(){
 // if($scope.nextNumber < ($scope.instaTotal.length)){
 //
 // 		return $location.path('social/'+$scope.nextNumber).search();
 //
 //
 // }else if($scope.nextNumber >= ($scope.instaTotal.length)){
 //
 // 		return $location.path('social/1').search();
 //
 // 	}
 // }

 $scope.socialMobileViewAll=function(){
	$location.path('/collections'+'/'+$routeParams.collection+'/'+$routeParams.season).search();

 }





 }//end if mobile






}]);



// Social.directive('instaimageclickDirective', function(){
// 	return {
// 		restrict: 'A',
// 		link: function(scope, element, attrs){
// 			setTimeout(function(){
// 			jQuery('.instagram-image').click(function(){
// 				jQuery('.insta-li').removeClass('no-hover-transition');
// 				jQuery('.instagram-image').css('opacity','1');
// 				jQuery('.instagram-click-overlay').removeClass('instagram-overlay-active');
// 				jQuery(this).siblings('.instagram-click-overlay').addClass('instagram-overlay-active');
// 				jQuery(this).css('opacity','.08');
// 				jQuery(this).parent('.insta-li').addClass('no-hover-transition');
// 			});
// 		},800);
// 		}
// 	}
// });




Social.directive('instaHoverDirective', function($location, $routeParams){
  return{
    restrict: "A",
    link: function(scope, element, attrs){

if ($location.path()== '/social/'+$routeParams.number){

			jQuery(document.documentElement).keyup(function (event) {
				// handle cursor keys
				if ( (event.keyCode == 37) && (scope.prevNumber > 0)) {
					// go left
			return $location.path('social/'+scope.prevNumber).search();

					// $location.go("social/{{prevNumber}}");

				} else if ((event.keyCode == 39) && (scope.nextNumber < (scope.instaTotal.length-1))) {

					// go right
			return $location.path('social/'+scope.nextNumber).search();
					// $location.go("social/{{nextNumber}}");

				}
				else if ((event.keyCode == 39) && (scope.nextNumber >= (scope.instaTotal.length))){

					return $location.path('social/1').search();
				}
				else if((event.keyCode == 37) && (scope.prevNumber == 0)){

					return $location.path('social/'+scope.instaTotal.length).search();

				}
			});
	}



      jQuery('.insta-hover-right').mouseenter(function(){
        jQuery('.insta-detail-next').css('opacity','1');
      });
      jQuery('.insta-hover-right').mouseleave(function(){
        jQuery('.insta-detail-next').css('opacity','0');
      });

      jQuery('.insta-detail-next').mouseenter(function(){
        jQuery('.insta-detail-next').css('opacity','1');
      });
      jQuery('.insta-detail-next').mouseleave(function(){
        jQuery('.insta-detail-next').css('opacity','0');
      });



      jQuery('.insta-hover-left').mouseenter(function(){
        jQuery('.insta-detail-prev').css('opacity','1');
      });
      jQuery('.insta-hover-left').mouseleave(function(){
        jQuery('.insta-detail-prev').css('opacity','0');
      });

      jQuery('.insta-detail-prev').mouseenter(function(){
        jQuery('.insta-detail-prev').css('opacity','1');
      });
      jQuery('.insta-detail-prev').mouseleave(function(){
        jQuery('.insta-detail-prev').css('opacity','0');
      });




      scope.goSocialPrevious = function(){

          if (scope.prevNumber > 0) {
            // go left
			         return $location.path('social/'+scope.prevNumber).search();

          }else if(scope.prevNumber == 0){

					return $location.path('social/'+scope.instaTotal.length).search();

          }
      }

      scope.goSocialNext=function(){
         if (scope.nextNumber >= (scope.instaTotal.length-1)){
								return $location.path('social/1').search();

        } else if (scope.nextNumber < (scope.instaTotal.length-1)) {
			       return $location.path('social/'+scope.nextNumber).search();

        }

      }



    }
  }

});



// //close button | product detail
// Social.directive('instaCloseDirective', function($window){
//   return{
//     restrict: "E",
//     replace: 'true',
//     templateUrl: 'social/close-instagram-detail.html'
//     // link: function(scope, element, attrs) {
//     //      element.on('click', function() {
//     //          $window.history.back();
//     //      });
//     //  }
//
//
//     }
//   });


Social.directive('instaShareDirective', function($routeParams){
	  return{
	    restrict: "E",
	    replace: true,
	    templateUrl: 'social/insta-share.html',
	    link: function(scope, element, attrs){

	      scope.instaCloseShare = function(){
	        scope.instaShareHide = false;
	      };


	//creting a dynamic link to share
	      scope.instaShareUrl = 'social/' + $routeParams.number;

	    }
	  }

	});

Social.directive('onFinishRender', function ($timeout) {
	return {
	    restrict: 'A',
	    link: function (scope, element, attr) {
	        if (scope.$last === true) {
	            $timeout(function () {
	                scope.$emit('ngRepeatFinished');
	            });
	        }
	    }
	}
	});


Social.directive('filterActiveDirective', function ($timeout) {
			return {
			    restrict: 'A',
			    link: function (scope, element, attr) {

scope.filterState = 2;
							// scope.filterActive = function(n){
							// 	scope.filterNumber = n;
							// 	return scope.filterNumber;
							// }

							scope.filterActive = function(i){
								scope.filterState = i;
							}
				// 	scope.filterState = function(i){
					// 		scope.
					//
			    // }
			}
			}
});

Social.directive('socialStyleParent', function(){
   return {
     restrict: 'A',
     link: function(scope, elem, attr) {

	    var socialUnbindWatcher = scope.$watch( function() {

	        scope.socialNewHeight = elem.height();


	        if (scope.socialNewHeight==0){

	          return scope.socialLoading = true;


	        }else if (scope.socialNewHeight > 0){
	          socialUnbindWatcher();
	          return scope.socialLoading = false;

	        }



            //check width and height and apply styling to parent here.
         });


     }
   };
});


Social.directive('socialDetailStyleParent', function(){
   return {
     restrict: 'A',
     link: function(scope, elem, attr) {

      var unbindWatcher = scope.$watch( function() {

         scope.imageWidth = elem.width();


          if (scope.imageWidth <= 5){

          jQuery(".social-loader").fadeIn('10', function(){

          });
            return scope.socialDetailLoading = true;

          }else{
          	 unbindWatcher();

             return scope.socialDetailLoading = false;
          }

      });
     }
   };
});

Social.directive("imageChange", function ($timeout) {
    return {
        restrict: "A",
        scope: {},
        link: function (scope, element, attrs) {
            element.on("load", function () {
                setTimeout(function () {
                    element.removeClass("ng-hide-fade");
                    element.addClass("ng-show");
                }, 500);
            });
            attrs.$observe("ngSrc", function () {
               element.removeClass("ng-show");
                element.addClass("ng-hide-fade");
            });
        }
    }
});


//
// Social.directive('fadeIn', function($timeout){
//     return {
//         restrict: 'A',
//         link: function($scope, $element, attrs){
//
//           $element.on('load', function() {
//
//               $element.removeClass("ng-hide-remove");
//               $element.removeClass("ng-hide-remove-active");
//               $element.addClass("ng-hide-add");
//               $element.addClass("ng-hide-add-active");
//
//               $element.addClass("ng-hide");
//
//               setTimeout(function(){
//                 $element.removeClass("ng-hide-add");
//                 $element.removeClass("ng-hide-add-active");
//                 $element.removeClass("ng-hide");
//                 $element.addClass("ng-hide-remove");
//                 $element.addClass("ng-hide-remove-active");
//                 $element.removeClass("ng-hide");
//               },700);
//
//
//               setTimeout(function(){
//                 $element.removeClass("ng-hide-remove");
//                 $element.removeClass("ng-hide-remove-active");
//
//             },900);
//           //
//           //   setTimeout(function(){
//           //
//           //   $element.addClass("ng-hide-remove");
//           //   $element.addClass("ng-hide-remove-active");
//           //   $element.removeClass("ng-hide-add");
//           //   $element.removeClass("ng-hide");
//           // },800);
//
//             });
//         }
//     }
// })
