'use strict';

import 'angular'
import 'angular-route'
import 'angular-animate'
import 'angular-resource'
import 'angular-touch'
import Prismic from 'prismic.io'
import jQuery from "jquery"
import "video.js"

var Application  = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngResource',
  'ngTouch'
])


Application.controller('appCtrl', function(getService, $scope, $rootScope, $routeParams){



            //............................................................GET requests.........................................................

            $rootScope.addShift = function(){
            	// jQuery('.navigation-header-content').addClass('blink');
              	setTimeout(function(){
              		jQuery('.navigation-header-wrapper').addClass('shift');
              		jQuery('.navigation-table').css("display","table");
              	},1000);
            };


            $rootScope.addBlink = function(){
              jQuery('.navigation-header-content').addClass('blink');
            };

            $rootScope.removeBlink = function(){
              jQuery('.navigation-header-content').removeClass('blink');
            };




            $rootScope.hideNavFN = function(){
              $scope.navHide = true;
            }

            $rootScope.hideNavOneFN = function(){
              $scope.navHideOne = true;
            }

});






























//.............................................................. FW15............................................................................


Application.controller('fwfifteenCtrl', function($anchorScroll, $location, $scope, anchorSmoothScroll,$window, $route,getService, $rootScope, $routeParams){

  // $scope.firstScroll();
  $scope.hasBlinkOnce = false;
  $rootScope.addShift();
  $rootScope.addBlink();
  $scope.mainLookShow=false;
  $rootScope.headerSectionName = "";
  $rootScope.catalogueSection=0;
  $rootScope.heroesSection=0;
  $rootScope.isHeroes=false;
  $rootScope.isCatalogue=false;
  $rootScope.hideArrow;
  $rootScope.hideReadInterview = false;
  $scope.scrollBackHappened=0;
  if(!$rootScope.isMobile){
    $scope.lookbookVH="3609px;";
  }

  //...........................initializing season variables
  $rootScope.currentPosition = "fw15";
  $rootScope.seasonData = [];
  $rootScope.film = {};
  $rootScope.catalogue = {};
  $rootScope.heroes = {};
  $rootScope.lookbook = {};

//initializing the variable that stop the scroll of the sections
  $scope.enableHeroesScroll = false;
  $scope.enableLookbookScroll = false;
  $scope.burgerColor = "#FFFFFF";
  var navActiveCheck = false;



  $rootScope.resetLookbook=function(){
    $scope.mainLookShow=false;
    $rootScope.readScrollDisable();
  }

    // This service's function returns a promise, but we'll deal with that shortly

    getService.get("fw15")
      // getService.get('fw15')
    // then() called when son gets back
    .then(function(data) {
        $rootScope.seasonData = data;
        $rootScope.metaData = data[0];
        $rootScope.film = data[1];
        $rootScope.catalogue = data[2];
        $rootScope.heroes = data[3];
        $rootScope.lookbook = data[4];

        $scope.$broadcast("myEvent");
        $scope.$broadcast("content_loaded_fw15");
    }, function(error) {
        // promise rejected, could log the error with: console.log('error', error);
        console.log('error', error);
    });
    // .then(function(){
    //   setTimeout(function(){
    //     $rootScope.endLoader();
    //   }, 600);
    //
    // });







$rootScope.headerHide = true;

$scope.headerHideOn = function(){

  if ($scope.headerHide == false){
    $rootScope.headerHide = true;
  }

}



$scope.headerHideOff = function(){

  if ($scope.headerHide == true){
    $rootScope.headerHide = false;
  }
}






    $scope.fw_hashFn = function(x){
              var newHash = x;
            if ($location.path() !== x) {

              if (x === "intro"){
                $location.path("", false);

              }else {
              // set the $location.hash to `newHash` and
              // $anchorScroll will automatically scroll to it
                $location.path("fw15/"+x, false);
              }


            } else {
              // call $anchorScroll() explicitly,
              // since $location.hash hasn't changed

              // $anchorScroll();
            }
    }








    //..................................................changing anchor link on scroll


    // setTimeout(function(){



          // $scope.burgerColorOffset = jQuery('#issueHash').offset().top -1;

            // $scope.navigationLinks = [];
            //
            // for (i = 1; i < $rootScope.seasonData.length; i++){
            //   $scope.paths = $rootScope.seasonData[i].navigation;
            //   $scope.navigationLinks = $scope.navigationLinks.concat($scope.paths);
            //
            // }



    //function that defines the offset of each anchor, hence where the path should change

    $rootScope.fw15_scroller = function(navState){

            // $scope.burgerColorOffset = jQuery('#issueHash').offset().top -1;

              $scope.navigationLinks = [];

              for ( var i = 1; i < $rootScope.seasonData.length; i++){
                $scope.paths = $rootScope.seasonData[i].navigation;
                $scope.navigationLinks = $scope.navigationLinks.concat($scope.paths);

              }

            //initializing
            $scope.navHideOne = true;
            $scope.navFadeOne = 0;

            jQuery($window).unbind("scroll.fw_fifteen_scroll");
            jQuery($window).unbind("scroll.ss_sixteen_scroll");
            jQuery($window).unbind("scroll.support_scroll");

            var scroll = 0;
            $scope.offset =[]

            for (i in  $scope.navigationLinks){

                $scope.thisoffset = jQuery('#'+$scope.navigationLinks[i]+'Hash').offset().top -1;
                $scope.offset = $scope.offset.concat($scope.thisoffset);

              }



            //....nav-one offset

              if(!$rootScope.isMobile){
                $scope.navOffset = jQuery('#fw15-navHash').offset().top -1;
              }


            //....height of a window
            $scope.windowHeight = $window.innerHeight;
            $scope.lookbookOffset = jQuery('#lookbookHash').offset().top-1;



              /*catalog
              1  //bianco
              2  //nero  //bianco
              3  //nero
              4  //bianco
              5  //bianco
              6  //bianco
              7  //bianco

              //heroes
              8  //bianco
              9  //nero //bianco //nero //transparent //nero
              10  //bianco
              11  //nero
              12  //nero


              //lookbook
              13  //nero

              //nav
              14  //transparent

              */



              // $scope.burgerDistance = $scope.offset[0] - 144;
              $scope.catalogOneDistance = $scope.offset[1]+$scope.windowHeight;
              $scope.catalogTwoDistance = $scope.offset[1]+($scope.windowHeight*2);
              $scope.catalogThreeDistance = $scope.offset[1]+($scope.windowHeight*3);
              $scope.catalogFourDistance = $scope.offset[1]+($scope.windowHeight*4)
              $scope.catalogFiveDistance = $scope.offset[1]+($scope.windowHeight*5);
              $scope.catalogSixDistance = $scope.offset[1]+($scope.windowHeight*6);
              $scope.catalogSevenDistance = $scope.offset[2];
              $scope.heroesOneDistance = $scope.offset[2]+($scope.windowHeight); //first heroes
              $scope.heroesTwoDistance = $scope.offset[2]+($scope.windowHeight*2);//second heroes
              // $scope.heroesThreeDistance = $scope.offset[2]+($scope.windowHeight*3);//third heroes
              // $scope.heroesFourDistance = $scope.offset[2]+($scope.windowHeight*4);//four heroes
              $scope.heroesThreeDistance =$scope.lookbookOffset;//fifth heroes

              $scope.lookbookDistance = $scope.navOffset;//one lookbook
              $scope.navOneDistance = $scope.navOffset+$scope.windowHeight;//one nav

              $scope.burgerOffset = [
                // $scope.burgerDistance,
                $scope.catalogOneDistance, //0
                $scope.catalogTwoDistance, //1
                $scope.catalogThreeDistance, //2
                $scope.catalogFourDistance, //3
                $scope.catalogFiveDistance, //4
                $scope.catalogSixDistance, //5
                $scope.catalogSevenDistance, //6
                $scope.heroesOneDistance, //7
                $scope.heroesTwoDistance, //8
                $scope.heroesThreeDistance, //9
                $scope.lookbookDistance, //10
                $scope.navOneDistance//11

              ]
              // $scope.heroesFourDistance, //10
              // $scope.heroesFiveDistance, //11





      jQuery($window).bind("scroll.fw_fifteen_scroll", function(event) {

            scroll =  jQuery($window).scrollTop();


            if(!$rootScope.isMobile){
              // nav fade out
              if (scroll < 200) {
                $scope.navFade = ((scroll-200)*(-1))/200;
                $scope.navHide = false;
              }
              //..............................................................................fading in second nav
              // nav ONE fade in
              else if ((scroll >= 200)&&(scroll < ($scope.navOffset-$scope.windowHeight))) {

                $scope.navHideOne = true;
                $rootScope.hideArrow = true;
                $scope.supportFade =0;
                $scope.navFade = 0;
                $scope.navHide = true;
                $rootScope.removeBlink();

                jQuery(".lookbook-ul").css({"position": "absolute"});
                jQuery(".lookbook-ul").css({"top": "0"});

              }else if ((scroll > ($scope.navOffset-$scope.windowHeight)) && (scroll < ($scope.navOffset+$scope.windowHeight))) {

                jQuery(".lookbook-ul").css({"position": "fixed"});
                jQuery(".lookbook-ul").css({"top": "-2830px"});

                $scope.navFadeOne = (((($scope.navOffset-$scope.windowHeight)-scroll))*(-1))/200;
                $scope.navHideOne = false;
              }
            }







      if ((scroll > $scope.burgerOffset[7])&& (scroll <= $scope.burgerOffset[8])) {
        $scope.mainLookShow=false;
      }else if ((scroll > $scope.burgerOffset[8])&& (scroll <= $scope.burgerOffset[9])) {
        $scope.mainLookShow=false;
        $scope.enableHeroesScroll = true;
        $scope.mainLookShow=false;

      }else if ((scroll > $scope.burgerOffset[9])&&(scroll <= ($scope.burgerOffset[10]))){
          $rootScope.shiftImage_heroes = false;
          $scope.lookbookMainMargin = (1)*(($scope.burgerOffset[11]+48)-scroll);
          if(scroll >= ($scope.burgerOffset[10]+400)){
            $scope.looksStagger = true;
          }
          $scope.mainLookShow=true;


          if($rootScope.isMobile){
            $scope.mainLookShow=false;
          }

      }else if ((scroll > $scope.burgerOffset[10])&&(scroll <= ($scope.burgerOffset[11]))){
          $scope.mainLookShow=false;
      }else if ((scroll > ($scope.burgerOffset[11]))&&(scroll <= $scope.burgerOffset[12])){



        }else if ((scroll > $scope.burgerOffset[12]) && (scroll <= $scope.burgerOffset[13])) {



        }




    //..................................................................burger scroll function


          if ((scroll<$scope.offset[0])&&(navState === false)) {
            $scope.burgerColor = "#FFFFFF";
            $scope.headerHideOn();


            }else  if (((scroll>=$scope.offset[0])&&(scroll< $scope.offset[1]))&&(navState === false)) {

                $scope.burgerColor = "#FFFFFF";
                $scope.headerHideOff();
                $scope.isHeroes=false;
                $scope.isCatalogue=false;

                if (scroll<=($scope.offset[0]+500)){
                  $scope.showSound = true;
                }else if(scroll>=($scope.offset[0]+500)){
                  $scope.showSound = false;
                }

            }
           else if (((scroll>=$scope.offset[1])&&(scroll< $scope.burgerOffset[0]))&&(navState === false)) {
               $scope.burgerColor = "#FFFFFF";
               $scope.headerHideOff();
               $scope.showSound = false;

               $rootScope.catalogueSection=0;
               $rootScope.heroesSection=0;
               $rootScope.isHeroes=false;
               $rootScope.isCatalogue=true;


           }else if (((scroll>=$scope.burgerOffset[0])&&(scroll< $scope.burgerOffset[1]))&&(navState === false)) {
                  $scope.burgerColor = "#000000";
                  $scope.headerHideOff();

                  $rootScope.catalogueSection=1;
                  $rootScope.heroesSection=0;
                  $rootScope.isHeroes=false;
                  $rootScope.isCatalogue=true;

           }else if (((scroll>=$scope.burgerOffset[1])&&(scroll< $scope.burgerOffset[2]))&&(navState === false)) {
                  $scope.burgerColor = "#000000";
                  $scope.headerHideOff();

                  $rootScope.catalogueSection=2;
                  $rootScope.heroesSection=0;
                  $rootScope.isHeroes=false;
                  $rootScope.isCatalogue=true;

           }else if (((scroll>=$scope.burgerOffset[2])&&(scroll< $scope.burgerOffset[3]))&&(navState === false)) {
                  $scope.burgerColor = "#000000";
                  $scope.headerHideOff();

                  $rootScope.catalogueSection=3;
                  $rootScope.heroesSection=0;
                  $rootScope.isHeroes=false;
                  $rootScope.isCatalogue=true;

          }else if (((scroll>=$scope.burgerOffset[3])&&(scroll< $scope.burgerOffset[4]))&&(navState === false)) {
                  $scope.burgerColor = "#FFFFFF";
                  $scope.headerHideOff();

                  $rootScope.catalogueSection=4;
                  $rootScope.heroesSection=0;
                  $rootScope.isHeroes=false;
                  $rootScope.isCatalogue=true;

          }else if (((scroll>=$scope.burgerOffset[4])&&(scroll< $scope.burgerOffset[5]))&&(navState === false)) {
                  $scope.burgerColor = "#FFFFFF";
                  $scope.headerHideOff();

                  $rootScope.catalogueSection=5;
                  $rootScope.heroesSection=0;
                  $rootScope.isHeroes=false;
                  $rootScope.isCatalogue=true;

          }else if (((scroll>=$scope.burgerOffset[5])&&(scroll< $scope.burgerOffset[6]))&&(navState === false)) {
                  $scope.burgerColor = "#FFFFFF";
                  $scope.headerHideOff();

                  $rootScope.catalogueSection=6;
                  $rootScope.heroesSection=0;
                  $rootScope.isHeroes=false;
                  $rootScope.isCatalogue=true;


          }else if (((scroll>=$scope.burgerOffset[6])&&(scroll< $scope.burgerOffset[7]))&&(navState === false)) {
                  $scope.burgerColor = "#FFFFFF";
                  $scope.headerHideOff();

                  $rootScope.heroesSection=0;
                  $rootScope.isHeroes=true;
                  $rootScope.isCatalogue=false;

                  if ((scroll > ($scope.burgerOffset[6]))&& (scroll <= ($scope.burgerOffset[6]+300))) {
                    $rootScope.heroesReadInterview(false);
                  }


          }else if (((scroll>=$scope.burgerOffset[7])&&(scroll< $scope.burgerOffset[8]))&&(navState === false)) {
                  $scope.burgerColor = "#000000";
                  $scope.headerHideOff();

                  $rootScope.heroesSection=1;
                  $rootScope.isHeroes=true;
                  $rootScope.isCatalogue=false;


                  if (scroll<=($scope.burgerOffset[8]-200)){
                    $rootScope.hideReadInterview = false;
                  }else if(scroll>=($scope.burgerOffset[8]-200)){
                    $rootScope.hideReadInterview = true;
                  }

                  console.log("this heroessss");


          }else if (((scroll>=$scope.burgerOffset[8])&&(scroll< $scope.burgerOffset[9]))&&(navState === false)) {
                  $scope.burgerColor = "#FFFFFF";
                  $scope.headerHideOff();

                  $rootScope.heroesSection=2;
                  $rootScope.isHeroes=false;
                  $rootScope.isCatalogue=false;
                  $rootScope.isLookbook=true;

                  if ((scroll > ($scope.burgerOffset[9]-300))&& (scroll <= $scope.burgerOffset[9])) {
                    $rootScope.heroesReadInterview(false);
                  }

                  $rootScope.hideReadInterview = true;



          }else if (((scroll>=$scope.burgerOffset[9])&&(scroll< $scope.burgerOffset[10]))&&(navState === false)) {
                  $scope.burgerColor = "#000000";
                  $scope.headerHideOff();

                  $rootScope.isHeroes=false;
                  $rootScope.isCatalogue=false;

                  $rootScope.isLookbook=true;


          }else if (((scroll>=$scope.burgerOffset[10])&&(scroll< $scope.burgerOffset[11]))&&(navState === false)) {
            $scope.burgerColor = "#000000";
            $scope.headerHideOff();

            $rootScope.isLookbook=true;

          }else if (((scroll>=$scope.burgerOffset[11])&&(scroll< $scope.burgerOffset[12]))&&(navState === false)) {
            $scope.burgerColor = "#000000";
            $scope.headerHideOn();


          }else if (((scroll>=$scope.burgerOffset[12])&&(scroll< $scope.burgerOffset[13]))&&(navState === false)) {


          }






    //................................scroll back _ catalogue


            if ((scroll >= ($scope.burgerOffset[0] - 200))&&(scroll < $scope.burgerOffset[1])){

              if ($scope.scrollBackHappened != 1){
                $rootScope.scrollBack(1);
                $scope.scrollBackHappened = 1;
              }


            }else if((scroll >= ($scope.burgerOffset[5] -200))&&(scroll < $scope.burgerOffset[6])){

              if ($scope.scrollBackHappened != 2){
                $rootScope.scrollBack(6);
              }
              $scope.scrollBackHappened = 2;


            }


    //................................scroll back _ heroes

                if (scroll >= ($scope.burgerOffset[6] -200)){
                  if ($scope.heroes_scrollBackHappened != 1){
                    $rootScope.heroes_scrollBack(0);
                  }
                  $scope.heroes_scrollBackHappened = 1;
                }



    // ................................url

                      if  (scroll < $scope.offset[0]) {

                        $scope.fw_hashFn("intro");
                        $rootScope.headerSectionName = "";

                      } else if  ((scroll >= $scope.offset[0])&&(scroll < $scope.offset[1])) {

                        //film
                            $scope.fw_hashFn($scope.navigationLinks[0]);
                              $rootScope.headerSectionName = $scope.navigationLinks[0];

                       } else if ((scroll >= $scope.offset[1])&&(scroll < $scope.offset[2])){

                       //catalogue
                         $scope.fw_hashFn($scope.navigationLinks[1]);
                         $rootScope.headerSectionName = $scope.navigationLinks[1];

                       } else if ((scroll >= $scope.offset[2])&&(scroll < $scope.offset[3])){

                        //heroes
                          $scope.fw_hashFn($scope.navigationLinks[2]);
                          $rootScope.headerSectionName = $scope.navigationLinks[2];



                        } else if ((scroll >= $scope.offset[3])&&(scroll < $scope.navOffset)){

                          //lookbook
                          $scope.fw_hashFn($scope.navigationLinks[3]);
                          $rootScope.headerSectionName = $scope.navigationLinks[3];


                        } else if ((scroll >= $scope.navOffset)&& (!$rootScope.isMobile)){

                          // $routeParams.section = "intro";
                            $rootScope.headerSectionName = "";

                          //lookbook
                          $scope.fw_hashFn("intro");


                        }


                      $scope.$apply();

                  });//..end of scroll

                  $scope.$broadcast("content_loaded_fw15");


            }//end of the scroller function












    // }, 5000);  // end timeout

    $scope.$on('$viewContentLoaded', function(){
setTimeout(function(){
  $rootScope.fw15_scroller(navActiveCheck);
},600);


    });



}); //..end of controller



















































//.............................................................. SS16............................................................................



Application.controller('sssixteenCtrl', function($anchorScroll, $location, $scope, anchorSmoothScroll,$window, $route,getService, $rootScope, $routeParams){

  //
  // $scope.firstScroll();
  $scope.hasBlinkOnce = false;
  $rootScope.addBlink();
  $rootScope.addShift();
  $scope.mainLookShow=false;
  $rootScope.headerSectionName = "";
  $rootScope.isLookbook=true;
  if(!$rootScope.isMobile){
    $scope.lookbookVH = "4509px;";
  }


  //...........................initializing season variables
  $rootScope.currentPosition = "ss16";
  $rootScope.seasonData = [];

  $rootScope.film = {};
  $rootScope.catalogue = {};
  $rootScope.heroes = {};
  $rootScope.lookbook = {};
  $rootScope.headerHide = true;
  $scope.enableLookbookScroll=false;
  var navActiveCheck = false;

      // This service's function returns a promise, but we'll deal with that shortly

      getService.get("ss16")
        // getService.get('fw15')
      // then() called when son gets back
      .then(function(data) {

          $rootScope.seasonData = data;
          $rootScope.metaData = data[0];
          $rootScope.lookbook = data[1];
          $scope.$broadcast("myEvent");
          return $rootScope.ss16_scroller(navActiveCheck);

      }, function(error) {
          // promise rejected, could log the error with: console.log('error', error);
          console.log('error', error);

      });




      $scope.ss_hashFn = function(x){
                var newHash = x;
              if ($location.path() !== x) {


                if (x === "intro"){
                  $location.path("", false);

                }else {
                // set the $location.hash to `newHash` and
                // $anchorScroll will automatically scroll to it
                  $location.path("ss16/"+x, false);
                }


              } else {
                // call $anchorScroll() explicitly,
                // since $location.hash hasn't changed
                $anchorScroll();
              }
      }








      $rootScope.headerHide = true;

      $scope.headerHideOn = function(){
        if ($rootScope.headerHide == false){
          $rootScope.headerHide = true;
        }
      }


      $scope.headerHideOff = function(){

        if ($rootScope.headerHide == true){

          $rootScope.headerHide = false;

        }
      }








$rootScope.ss16_scroller = function(navState){

  jQuery($window).unbind("scroll.fw_fifteen_scroll");
    jQuery($window).unbind("scroll.ss_sixteen_scroll");
    jQuery($window).unbind("scroll.support_scroll");

  setTimeout(function(){


        $scope.navigationLinks = [];

        for (var i = 1; i < $rootScope.seasonData.length; i++){
          $scope.paths = $rootScope.seasonData[i].navigation;
          $scope.navigationLinks = $scope.navigationLinks.concat($scope.paths);
        }



        //initializing
        var scroll = 0;
        $scope.offset =[]
        $scope.navHideOne = true;
        $scope.navFadeOne = 0;
        $scope.enableLookbookScroll = false;


        if(!$rootScope.isMobile){
          $scope.navOffset = jQuery('#ss16-navHash').offset().top -1;
        }


        //....lookbook offset
        $scope.lookbookOffset = jQuery('#lookbookHash').offset().top -1;
        //....height of a window
        $scope.windowHeight = $window.innerHeight;




        for (i in  $scope.navigationLinks){
            $scope.thisoffset = jQuery('#'+$scope.navigationLinks[i]+'Hash').offset().top -1;
            $scope.offset = $scope.offset.concat($scope.thisoffset);
          }




//........SCROLL


      jQuery($window).bind("scroll.ss_sixteen_scroll", function(event) {

                    scroll =  jQuery($window).scrollTop();
                    // var scroll =  angular.element($window).yOffset;

                    // nav fade out
                    if (scroll < 200) {
                      $scope.navFade = ((scroll-200)*(-1))/200;
                      $scope.navHide = false;
                    }



                    //..............................................................................fading in second nav

                    // nav ONE fade in

                    else if ((scroll >= 200)&&(scroll < ($scope.navOffset-$scope.windowHeight))) {

                      $scope.navHideOne = true;
                      $scope.supportFade =0;

                      $scope.navFade = 0;
                      $scope.navHide = true;
                      $rootScope.removeBlink();



                      jQuery(".lookbook-ul").css({"position": "absolute"});
                      jQuery(".lookbook-ul").css({"top": "0"});


                    }else if ((scroll > ($scope.navOffset-$scope.windowHeight)) && (scroll < ($scope.navOffset+$scope.windowHeight))) {


                      jQuery(".lookbook-ul").css({"position": "fixed"});
                      jQuery(".lookbook-ul").css({"top": "-3730px"});



                                  if ((scroll > ($scope.navOffset-$scope.windowHeight))&&(scroll <= ($scope.navOffset))){


                                    if ($scope.hasBlinkOnce == true){

                                      jQuery('.navigation-one').addClass('blink-once');

                                    $scope.hasBlinkOnce = false;
                                    }



                                  }else if(scroll > ($scope.navOffset)){

                                    $scope.hasBlinkOnce = true;
                                      jQuery('.navigation-one').removeClass('blink-once');

                                  }




                        $scope.navFadeOne = (((($scope.navOffset-$scope.windowHeight)-scroll))*(-1))/200;
                        $scope.navHideOne = false;


                      }








              //..................................................................burger scroll function


                    if ((scroll<$scope.offset[0])&&(navState === false)) {
                      $scope.burgerColor = "#FFFFFF";
                      $scope.headerHideOn();

                      $scope.ss_hashFn("intro");
                      $rootScope.headerSectionName = "";
                      $scope.mainLookShow=false;
                      }else  if (((scroll>=$scope.offset[0])&&(scroll < $scope.navOffset))&&(navState === false)) {
                          $scope.burgerColor = "#000000";
                          $scope.headerHideOff();

                          $scope.ss_hashFn($scope.navigationLinks[0]);
                          $rootScope.headerSectionName = $scope.navigationLinks[0];
                      $scope.mainLookShow=true;

                      }else  if ((scroll >= $scope.navOffset)&&(navState === false)) {
                          $scope.burgerColor = "#FFFFFF";
                          $scope.headerHideOn();
                          $scope.ss_hashFn("intro");
                          $rootScope.headerSectionName = "";
                          $scope.mainLookShow=true;
                      }









                $scope.$apply();

            });



      }, 600);
      $scope.$broadcast("content_loaded_ss16");
    };//SS scroller function



});//end of ss16









































//............................................................. SUPPORT............................................................................


Application.controller('supportCtrl', function($anchorScroll, $location, $scope, anchorSmoothScroll,$window, $route,getService, $rootScope, $routeParams){




  $scope.burgerColor = "#000000";
  $scope.hasBlinkOnce = false;
  $rootScope.addBlink();
  $rootScope.addShift();
  $rootScope.currentPosition = "support";
  var navActiveCheck = false;
  $rootScope.headerSectionName = "";



    $rootScope.support = [];
    $rootScope.aboutData ={};
    $rootScope.contactData ={};
    $rootScope.stockistsData ={};
      // This service's function returns a promise, but we'll deal with that shortly

      getService.get("support")
      // then() called when son gets back
      .then(function(data) {

        $rootScope.support = data;
    		$rootScope.aboutData = data[0];
    		$rootScope.contactData = data[1];
    		$rootScope.stockistsData = data[2];
        $scope.$broadcast("supportDataArrived");


      }, function(error) {
          // promise rejected, could log the error with: console.log('error', error);
          console.log('error', error);
      });
      // .then(function(){
      //   setTimeout(function(){
      //     $rootScope.endLoader();
      //   }, 600);
      // });





            $scope.supportHashFn = function(x){
                var newHash = x;

                    if ($location.path() !== x) {

                      if (x === "intro"){
                        $location.path("/", false);

                      }else {
                      // set the $location.hash to `newHash` and
                      // $anchorScroll will automatically scroll to it
                        $location.path(x, false);
                      }

                    }else {
                      $anchorScroll();
                    }
            }







            $rootScope.headerHide = true;

            $scope.support_headerHideOn = function(){

              if ($rootScope.headerHide == false){

                $rootScope.headerHide = true;

              }

            }


            $scope.support_headerHideOff = function(){

              if ($rootScope.headerHide == true){

                $rootScope.headerHide = false;

              }
            }











$rootScope.support_scroller = function(navState){




    jQuery($window).unbind("scroll.fw_fifteen_scroll");
      jQuery($window).unbind("scroll.ss_sixteen_scroll");
      jQuery($window).unbind("scroll.support_scroll");


            //initializing
            // $scope.headerHide = true;
            $scope.navHideOne = true;
            $scope.navFadeOne = 0;
            var support_scroll = 0;



            //...about offset
            $scope.aboutOffset = jQuery('#aboutHash').offset().top -1;
            //...contact offset
            $scope.contactOffset = jQuery('#contactHash').offset().top -1;
            //...stocklists offset
            $scope.stockistsOffset = jQuery('#stockistsHash').offset().top -1;

            //....height of a window
            $scope.windowHeight = $window.innerHeight;




            //....nav-one offset
            // $scope.navOffset = jQuery('#ss116-navHash').offset().top -1;

          // angular.element(document.getElementById('#lookbook-image-28')).ready(function () {
            // setTimeout(function(){
              $scope.navSupportOffset = jQuery('#support-navHash').offset().top -1;
            // }, 3000);
          //  });









      jQuery($window).bind("scroll.support_scroll", function(event) {

              support_scroll = jQuery($window).scrollTop();

            if (support_scroll < $scope.aboutOffset ){

              $scope.supportHashFn('intro');
              $rootScope.headerSectionName = "";


            }else if ((support_scroll >= $scope.aboutOffset )&&(support_scroll < $scope.contactOffset )){

                $scope.supportHashFn('about');
                // $routeParams.section = 'about';
                $rootScope.headerSectionName = "about";

             }else if ((support_scroll >= $scope.contactOffset )&&(support_scroll < $scope.stockistsOffset )){

               $scope.supportHashFn('contact');
              //  $routeParams.section = 'contact';
              $rootScope.headerSectionName = "contact";

            }else if ((support_scroll > $scope.stockistsOffset)&&(support_scroll < $scope.navSupportOffset)){

              $scope.supportHashFn('stockists');
              // $routeParams.section = 'stockists';
              $rootScope.headerSectionName = "stockists";

            }else if(support_scroll >= $scope.navSupportOffset){
              $scope.supportHashFn('intro');
              $rootScope.headerSectionName = "";
            }




             // nav fade out
             if (support_scroll < 200) {
               $scope.navFade = ((support_scroll-200)*(-1))/200;
               $scope.navHide = false;
             }
             else if(support_scroll >= 200){

               $scope.navFade = 0;
               $scope.navHide = true;
               $rootScope.removeBlink();
             }

             //..............................................................................fading in second nav

             // nav ONE fade in

             if (support_scroll < ($scope.navSupportOffset-200)) {
               $scope.navHideOne = true;
               $scope.supportFade =0;
             }else if ((support_scroll > ($scope.navSupportOffset-200)) && (support_scroll < ($scope.navSupportOffset+$scope.windowHeight))) {

                           if ((support_scroll > ($scope.navSupportOffset-200))&&(support_scroll <= ($scope.navSupportOffset))){


                             if ($scope.hasBlinkOnce == true){
                               jQuery('.navigation-one').addClass('blink-once');
                             $scope.hasBlinkOnce = false;
                             }


                           }else if(support_scroll > ($scope.navSupportOffset)){

                             $scope.hasBlinkOnce = true;

                               jQuery('.navigation-one').removeClass('blink-once');

                           }

               $scope.navFadeOne = (((($scope.navSupportOffset-200)-support_scroll))*(-1))/200;
               $scope.navHideOne = false;
             }





       //..................................................................burger scroll function


             if ((support_scroll<$scope.aboutOffset)&&(navState === false)) {
               $scope.burgerColor = "#FFFFFF";
               $scope.support_headerHideOn();


             }else  if (((support_scroll>=$scope.aboutOffset)&&(support_scroll < $scope.navSupportOffset))&&(navState === false)) {
                   $scope.burgerColor = "#000000";
                   $scope.support_headerHideOff();

               }else  if ((support_scroll >= $scope.navSupportOffset)&&(navState === false)) {
                   $scope.burgerColor = "#FFFFFF";
                   $scope.support_headerHideOn();
               }




            $scope.$apply();

            });

            $scope.$broadcast("content_loaded_support");
          };




setTimeout(function(){

    $rootScope.support_scroller(navActiveCheck);
  }, 600);








});// end of the support controller
































Application.directive('imageFadeDirective', function($rootScope, $location, $timeout, $window){
	return{
		restrict:'A',
    link: function(scope, elem, attr){

      if(!$rootScope.isMobile){
        $timeout(function() {
            var windowHeight = $window.innerHeight;
            scope.imageWidth = elem[0].offsetHeight;
            var imageScroll = elem[0].offsetTop;
            scope.thisElement = elem;
            scope.child = elem.children();
            scope.thisID = scope.child.attr("id");
            var thisChild = angular.element( document.querySelector( '#'+scope.thisID ) )
            jQuery($window).bind("scroll.image_fade_scroll", function(event) {
              var scrolled = false;
              var window_scroll = jQuery($window).scrollTop();
              if ((window_scroll > (imageScroll - (windowHeight/1.7)))&&(scrolled==false)){
                  scope.thisElement.addClass("fadeScroll");
                  thisChild.addClass("fadeUp");
                  var scrolled = true;
              }
            });
        }, 600);
      }
    }
	}
});

var jqueryUI = require('./vendor/jquery-ui.min.js');
var services = require("./services.js");
var routes = require("./routes.js");
var about = require("./logo.js");
var about = require("./about.js");
var catalogue = require("./catalogue.js");
var contact = require("./contact.js");
var film = require("./film.js");
var heroes = require("./heroes.js");
var lookbook = require("./lookbook.js");

var social = require("./social.js");
var stockists = require("./stockists.js");
var nav = require("./nav.js");
