'use strict';

angular.module('shareLocApp')
  .factory('facebookservice', function ($q) {

    var userId = '',
        friends;

    FB.init({
      appId: 1421234394814732,
      status: false,
      cookie: true,
      xfbml: true
    });
    return {
      login: function(){
        var deferred = $q.defer();
        FB.login(function(response) {
          deferred.resolve(response);
        }, {scope: 'email,user_friends,read_friendlists'});
        return deferred.promise;
      },
      getUserId: function(){
        return userId;
      },
      setUserId: function(userIdParam){
        userId = userIdParam;
      },
      friends: function(userId){
        var deferred = $q.defer();
        FB.api(
          "/10152474224230739/friendlists",
          function (response) {
            if (response && !response.error) {
              angular.forEach(response.data,function(value){
                console.log();
                FB.api(
                  "/"+value.id+"/members",
                  function (response) {
                    if (response && !response.error) {
                      console.log('members');
                      console.log(response);
                    }
                  }
                );
              });
            }
          }
        );
      }
    };
  });
