'use strict';

angular.module('shareLocApp')
  .controller('LoginCtrl', function ($scope,facebookservice,settingsservice) {
    $scope.facebookLogin = function(){
      facebookservice.login().then(function(response){
        console.log(response);
        if(response.authResponse){
          facebookservice.setUserId(response.authResponse.userID);
          facebookservice.friends();
        }else{

        }
      });
    }
  });
