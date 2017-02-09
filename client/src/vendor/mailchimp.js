/**
 * angular-mailchimp
 * http://github.com/keithio/angular-mailchimp
 * License: MIT
 */

'use strict';

angular.module('mailchimp', ['ng', 'ngResource', 'ngSanitize'])

  /**
   * Form controller for a new Mailchimp subscription.
   */
  .controller('MailchimpSubscriptionCtrl', ['$log', '$resource', '$scope', '$rootScope',
              function ($log, $resource, $scope, $rootScope) {


$rootScope.mailchimp={
  'ADDRESS':{
      'addr1':'',
      'city':'',
      'state':'',
      'zip':'',
      'country':''
    }
  };


    // Handle clicks on the form submission.
    $scope.addSubscription = function (mailchimp) {
      var actions,
          MailChimpSubscription,
          params = {},
          url;

      // Create a resource for interacting with the MailChimp API
      url = '//' + mailchimp.username + '.' + mailchimp.dc +
            '.list-manage.com/subscribe/post-json';


            console.log(mailchimp);

      var fields = Object.keys(mailchimp);


//COMPILING ADDRESS
      var newaddress = [];
      for(i in mailchimp.ADDRESS){
        console.log(i);
        if(i=='addr1'){
          newaddress = newaddress +mailchimp.ADDRESS[i];
        }else{
          newaddress = newaddress + '   ' +mailchimp.ADDRESS[i];
        }
      }
      mailchimp.ADDRESS = newaddress;
      console.log('ADDRESS: '+mailchimp.ADDRESS);


//COMPILING DATE
      var date = [];
      for(i in mailchimp.MMERGE4){
        console.log(i);
        if(i=='MONTH'){
          date = date +mailchimp.MMERGE4[i];
        }else{
          date = date + '/' +mailchimp.MMERGE4[i];
        }
      }
      mailchimp.MMERGE4 = date;
      console.log('DATE: '+mailchimp.MMERGE4);



      for(var i = 0; i < fields.length; i++) {
        params[fields[i]] = mailchimp[fields[i]];
      }

      params.c = 'JSON_CALLBACK';

      actions = {
        'save': {
          method: 'jsonp'
        }
      };
      MailChimpSubscription = $resource(url, params, actions);

      // Send subscriber data to MailChimp
      MailChimpSubscription.save(
        // Successfully sent data to MailChimp.
        function (response) {
          // Define message containers.
          mailchimp.errorMessage = '';
          mailchimp.successMessage = '';

          // Store the result from MailChimp
          mailchimp.result = response.result;
          console.log(response);

          // Mailchimp returned an error.
          if (response.result === 'error') {
            if (response.msg) {
              // Remove error numbers, if any.
              var errorMessageParts = response.msg.split(' - ');
              if (errorMessageParts.length > 1)
                errorMessageParts.shift(); // Remove the error number
              mailchimp.errorMessage = errorMessageParts.join(' ');
            } else {
              mailchimp.errorMessage = 'Sorry! An unknown error occured.';
            }
          }
          // MailChimp returns a success.
          else if (response.result === 'success') {
            mailchimp.successMessage = response.msg;
          }

          //Broadcast the result for global msgs
          $rootScope.$broadcast('mailchimp-response', response.result, response.msg);
        },

        // Error sending data to MailChimp
        function (error) {
          $log.error('MailChimp Error: %o', error);
        }
      );
    };
  }]);
