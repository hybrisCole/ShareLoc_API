'use strict';

angular.module('shareLocApp')
  .factory('facebookservice', function ($q) {

    var userId = '',
        friends;

    FB.init({
      appId: 1415947262014338,
      status: false,
      cookie: true,
      xfbml: true
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
