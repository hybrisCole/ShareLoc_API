'use strict';

angular.module('shareLocApp')
  .factory('facebookservice', function ($q) {

    var userId = '',
        userAccessToken = '',
        friends;

    return {
      login: function(){
        var deferred = $q.defer();
        FB.login(function(response) {
          deferred.resolve(response);
        }, {scope: 'email,public_profile,user_friends,publish_actions, publish_stream'});
        return deferred.promise;
      },
      getUserId: function(){
        return userId;
      },
      setUserId: function(userIdParam){
        userId = userIdParam;
      },
      getUserAccessToken: function(){
        return userAccessToken;
      },
      setUserAccessToken: function(userTokenParam){
        userAccessToken = userTokenParam;
      },
      friends: function(){
        var deferred = $q.defer();
        FB.api(
          '/'+userId+'/friends',
          function (response) {
            if (response && !response.error) {
              _.each(response.data,function(friend){
                FB.api('/'+friend.id+'/picture?height=100&width=100',function(friendUrl){
                  //seleccionado en la lista para compartir direcciones
                  friend.selected = false;
                  friend.img_url = friendUrl.data.url;
                  deferred.notify(friend);
                });
              });
            }else{
              deferred.reject(response);
            }
          }
        );
        return deferred.promise;
      }
    };
  });
