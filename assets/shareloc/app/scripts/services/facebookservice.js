'use strict';

angular.module('shareLocApp')
  .factory('facebookservice', function ($q,$location,$rootScope) {

    var userId = '',
        friends,
        loginDetectedFunction = function(response){
          if(response.status == 'connected'){
            userId = response.authResponse.userID;
            $rootScope.$apply(function(){
              $location.path('/main');
            });
          } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
          } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
          }
        };

    FB.init({
      appId: 1415947262014338,
      version    : 'v2.0',
      cookie: true,
      xfbml: true
    });



    FB.Event.subscribe('auth.statusChange', function(response) {
      loginDetectedFunction(response);
    });

    FB.getLoginStatus(function(response) {
      loginDetectedFunction(response);
    });

    return {
      login: function(){
        var deferred = $q.defer();
        FB.login(function(response) {
          deferred.resolve(response);
        }, {scope: 'email,public_profile,user_friends'});
        return deferred.promise;
      },
      getUserId: function(){
        return userId;
      },
      setUserId: function(userIdParam){
        userId = userIdParam;
      },
      friends: function(){
        var deferred = $q.defer();
        FB.api(
          '/'+userId+'/friends',
          function (response) {
            if (response && !response.error) {
              deferred.resolve(response);
            }
          }
        );
        return deferred.promise;
      }
    };
  });
