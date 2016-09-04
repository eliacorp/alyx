'use strict';

/* Services */
var Service = angular.module('myApp');



Service.factory('getService', function($http, $q, $timeout){

    return {
              get: function(url) {


              // var dfd = $q.defer();
              // $timeout(function(){

                  // the $http API is based on the deferred/promise APIs exposed by the $q service
                  // so it returns a promise for us by default
                  return $http.get('/data/'+url+'.json')
                      .then(function(response) {


                          if (typeof response.data === 'object') {
                              return response.data;
                          } else {
                              // invalid response
                              console.log('rejected');
                              return $q.reject(response.data);
                          }

                          // dfd.resolve(response);

                      }, function(response) {
                          // something went wrong
                          return $q.reject(response.data);
                      });



                    // },2000);
                    // return dfd.promise;



              }
          };

    // return $resource('/data/'+url+'.json',{},{get:{method:'GET'}})


});

Service.service('preload', function () {
      return {
          images: function (arrayOfImages) {

            function preload(arrayOfImages) {
                jQuery(arrayOfImages).each(function(){
                    var image = jQuery('<img/>')[0].src = this;

                    jQuery('body').append(image).css("visibility", "hidden");
                    // Alternatively you could use:
                    // (new Image()).src = this;
                });
            }

            // Usage:

            // preload([
            //     'img/imageName.jpg',
            //     'img/anotherOne.jpg',
            //     'img/blahblahblah.jpg'
            // ]);

              // return property;
          }
      };
  });


  //
  // Service.service('sharedProperties', function () {
  //       var property = '#FFFFFF';
  //
  //       return {
  //           getProperty: function () {
  //               return property;
  //           },
  //           setProperty: function(value) {
  //               property = value;
  //           }
  //       };
  //   });
