// lib.js

'use strict'
var jQuery = require('jquery');

/* Services */
var Service = angular.module('myApp');



Service.factory("transformRequestAsFormPost", () => {
        // I prepare the request data for the form post.
        function transformRequest( data, getHeaders ) {
            var headers = getHeaders();
            headers[ "Content-type" ] = "application/x-www-form-urlencoded; charset=utf-8";
            return( serializeData( data ) );
        }
        // Return the factory value.
        return( transformRequest );
        // ---
        // PRVIATE METHODS.
        // ---
        // I serialize the given Object into a key-value pair string. This
        // method expects an object and will default to the toString() method.
        // --
        // NOTE: This is an atered version of the jQuery.param() method which
        // will serialize a data collection for Form posting.
        // --
        // https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
        function serializeData( data ) {
            // If this is not an object, defer to native stringification.
            if ( ! angular.isObject( data ) ) {
                return( ( data == null ) ? "" : data.toString() );
            }
            var buffer = [];
            // Serialize each key in the object.
            for ( var name in data ) {
                if ( ! data.hasOwnProperty( name ) ) {
                    continue;
                }
                var value = data[ name ];
                buffer.push(
                    encodeURIComponent( name ) +
                    "=" +
                    encodeURIComponent( ( value == null ) ? "" : value )
                );
            }
            // Serialize the buffer and clean it up for transportation.
            var source = buffer
                .join( "&" )
                .replace( /%20/g, "+" )
            ;
            return( source );
        }
    }
);




Service.service('anchorSmoothScroll', function($location, $rootScope){

    this.scrollTo = function(eID) {

        // This scrolling function
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };





  this.scrollHorizontally = function(number, section) {

       var element = $rootScope.retrieveElement("shop");
      // var element = jQuery("#shop");
       console.log(element);

      // event.preventDefault();

        //
        element.stop().animate({
          scrollLeft: number
        },500,
          'linear'
          // function() {
          //   // $location.path(section, false);
          //   // console.log($location.path());
          // }
        );


    };

    this.scrollHorizontallyFast = function(number, section) {


           var element = $rootScope.retrieveElement("shop");

          // event.preventDefault();

            element.stop().animate({
              scrollLeft: number
            }, 300,
              'easeInOutQuart'
              // function() {
              //   // $location.path(section, false);
              //   // console.log($location.path());
              // }
            );

      };




    this.scrollToZero = function(id) {


           var element = jQuery(id);

          event.preventDefault();

          element.stop().animate({
            scrollTop: 0
          },1000,
            'easeInOutQuart'
            // function() {
            //   // $location.path(section, false);
            //   // console.log($location.path());
            // }
          );

      }


      this.scrollOneViewport = function() {



              setTimeout(function(){
                var number, element, scroll, scrollPosition, windowheight;
                       element = jQuery('.world-detail-wrapper');
                       windowheight = window.innerHeight;
                       if ($rootScope.isMobile && $rootScope.isDevice){
                          windowheight = $window.innerHeight + 130;
                       }


                        element.stop().animate({
                          scrollTop: windowheight
                        },1000,
                          'easeInOutQuart'
                          // function() {
                          //   // $location.path(section, false);
                          //   // console.log($location.path());
                          // }
                        );
                      }, 100);

            }




});


// };
