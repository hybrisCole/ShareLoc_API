'use strict';

angular.module('shareLocApp')
  .controller('LoginCtrl', function ($scope,facebookservice) {
    $scope.facebookLogin = function(){
      facebookservice.login().then(function(response){
        if(response.authResponse){
          facebookservice.setUserId(response.authResponse.userID);
        }
      });

    }
  });
